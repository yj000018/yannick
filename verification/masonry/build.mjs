import {build} from 'esbuild';
import {compile} from 'sass';
import {mkdir, writeFile} from 'node:fs/promises';
await mkdir('build', {recursive:true});
const css=compile('../../src/styles/blocks/showcase.sass').css;
await writeFile('build/showcase.css', css);
for(const [name,entry] of [['modern','modern.jsx'],['legacy','legacy-baseline/legacy.jsx']]) {
  await build({entryPoints:[entry],bundle:true,outfile:`build/${name}.js`,platform:'browser',format:'iife',define:{'process.env.NODE_ENV':'"development"'}});
  await writeFile(`build/${name}.html`, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="/showcase.css"><style>body{margin:0}h1{font:16px sans-serif}.showcase__item img{display:block;width:100%;height:auto}.card{margin:0;background:#eee}.card figcaption{height:32px}</style></head><body><h1>SYNTHETIC COMPATIBILITY TEST — NOT PORTFOLIO CONTENT</h1><div id="root"></div><script src="/${name}.js"></script></body></html>`);
}
await build({entryPoints:['ssr.jsx'],bundle:true,outfile:'build/ssr.cjs',platform:'node',format:'cjs',external:['react','react-dom/server']});
