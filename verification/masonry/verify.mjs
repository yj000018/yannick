import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile, writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';

const allowed = new Set(['modern.html','legacy.html','modern.js','legacy.js','showcase.css']);
const server = createServer(async(req,res)=>{
  const name = new URL(req.url,'http://localhost').pathname.slice(1);
  if (!allowed.has(name)) {res.writeHead(404);res.end();return;}
  try {
    const data=await readFile('build/'+name);
    res.setHeader('Content-Type',name.endsWith('.html')?'text/html':name.endsWith('.css')?'text/css':'text/javascript');
    res.end(data);
  } catch {res.writeHead(500);res.end();}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
let browser;
const cases=[];
try {
  browser=await chromium.launch({headless:true});
  const pages=[];
  for (const name of ['legacy','modern']) {
    const page=await browser.newPage({viewport:{width:1440,height:1000}});
    const errors=[];const remoteRequests=[];const consoleErrors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error') consoleErrors.push(message.text());});
    page.on('request',request=>{if (!request.url().startsWith(origin) && !request.url().startsWith('data:')) remoteRequests.push(request.url());});
    await page.goto(`${origin}/${name}.html`);
    pages.push({page,name,errors,remoteRequests,consoleErrors});
  }
  async function snapshot(record,count) {
    const page=record.page;
    await page.waitForFunction(count=>{
      const cards=[...document.querySelectorAll('[data-card]')];
      return cards.length===count && cards.every(card=>getComputedStyle(card).position==='absolute' && card.querySelector('img').complete && card.querySelector('img').naturalWidth>0);
    },count);
    await page.waitForTimeout(1200);
    await page.waitForFunction(() => document.getAnimations().every(a => a.playState !== 'running'));
    return page.evaluate(()=>({
      cards:[...document.querySelectorAll('[data-card]')].map(card=>{const r=card.getBoundingClientRect();return {id:card.dataset.card,x:r.x,y:r.y,width:r.width,height:r.height,href:card.querySelector('a').getAttribute('href')};}),
      gridHeight:document.querySelector('.showcase').getBoundingClientRect().height,
      horizontalOverflow:document.documentElement.scrollWidth>innerWidth
    }));
  }
  async function compare(label,count) {
    const [baseline,candidate]=await Promise.all(pages.map(p=>snapshot(p,count)));
    assert.deepEqual(candidate.cards.map(c=>[c.id,c.href]),baseline.cards.map(c=>[c.id,c.href]),label+' content/order');
    for(let i=0;i<count;i++)for(const key of ['x','y','width','height'])assert.ok(Math.abs(candidate.cards[i][key]-baseline.cards[i][key])<=1,label+' '+key+' '+JSON.stringify({candidate:candidate.cards[i],baseline:baseline.cards[i]}));
    assert.ok(Math.abs(candidate.gridHeight-baseline.gridHeight)<=1,label+' container height');
    assert.equal(candidate.horizontalOverflow,baseline.horizontalOverflow,label+' overflow parity');
    assert.equal(candidate.horizontalOverflow,false,label+' no overflow');
    cases.push({label,width:pages[0].page.viewportSize().width,syntheticCards:count,geometryParityWithinPx:1,sourceOrderAndLinksRetained:true,horizontalOverflow:false});
  }
  for(const width of [1440,1400,1100,900,401,400,320]){
    await Promise.all(pages.map(p=>p.page.setViewportSize({width,height:1000})));
    // A fresh native reference avoids the legacy wrapper's stale resize measurements.
    await pages[0].page.reload();
    await compare('responsive-'+width,7);
  }
  await Promise.all(pages.map(p=>p.page.evaluate(()=>window.probe.setImage('a',480))));
  await compare('image-height-change',7);
  await Promise.all(pages.map(p=>p.page.evaluate(()=>window.probe.render(['a','b','h','c','d','e','f','g']))));
  await compare('insert-card',8);
  await Promise.all(pages.map(p=>p.page.evaluate(()=>window.probe.render(['b','h','c','f']))));
  await compare('remove-and-reorder',4);
  await Promise.all(pages.map(p=>p.page.evaluate(()=>window.probe.render([]))));
  await compare('empty-grid',0);
  await Promise.all(pages.map(p=>p.page.evaluate(()=>window.probe.render(['a','b','c','d','e','f','g']))));
  await compare('restore-grid',7);
  for(const record of pages){
    await record.page.evaluate(()=>window.probe.unmount());
    await record.page.setViewportSize({width:390,height:844});
    await record.page.waitForTimeout(600);
    assert.equal(await record.page.locator('[data-card]').count(),0,record.name+' unmount');
    assert.deepEqual(record.errors,[],record.name+' browser errors');
    assert.deepEqual(record.remoteRequests,[],record.name+' external requests');
    if(record.name==='modern')assert.deepEqual(record.consoleErrors,[],'candidate console errors');
  }
  const cancelled=await browser.newPage();
  const cancellationErrors=[];
  cancelled.on('pageerror',error=>cancellationErrors.push(error.message));
  cancelled.on('console',message=>{if(message.type()==='error') cancellationErrors.push(message.text());});
  await cancelled.goto(`${origin}/modern.html?cancel`);
  await cancelled.waitForTimeout(250);
  assert.equal(await cancelled.locator('#root').innerHTML(),'','unmount before imports settle');
  assert.deepEqual(cancellationErrors,[],'cancelled initialization errors');
  await cancelled.close();
  const result={pendingInitializationCancellation:true,referenceProtocol:'Fresh legacy load at each width versus continuous candidate resize; image-size changes use React props on both.',scope:'Synthetic compatibility fixtures only; not CMS/content/portfolio acceptance',baseline:'React 16.14.0 + native react-masonry-component 6.2.1',candidate:'React 18.3.1 StrictMode + proposed adapter',engines:'Same Masonry 4.2.2 / imagesLoaded 4.1.4',cases,unmountAndResizeWithoutErrors:true,browserPageErrors:[],externalRequests:[]};
  await writeFile('proof.json',JSON.stringify(result,null,2)+'\n');
  console.log(`PASS: ${cases.length} baseline/candidate layout cases, cleanup and no external requests`);
} finally {
  await browser?.close();
  await new Promise(resolve=>server.close(resolve));
}
