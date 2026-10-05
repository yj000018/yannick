export const initialIds = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
export function svg(height) {
  return 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="${height}"><rect width="400" height="${height}" fill="#ccd8df"/></svg>`);
}
export function cards(React, ids, heights = {}) {
  return ids.map((id, i) => React.createElement('div', {key:id, className:'showcase__item', 'data-card':id},
    React.createElement('figure', {className:'card'},
      React.createElement('img', {src:svg(heights[id] ?? (80+i*37)), alt:'Synthetic verification fixture '+id}),
      React.createElement('figcaption', null, React.createElement('a', {href:'/works/synthetic-'+id}, 'Synthetic card '+id)))));
}
export function expose(React, render, unmount, Component) {
  let currentIds = initialIds;
  const heights = {};
  const draw = ids => {currentIds = ids; render(React.createElement(Component, {className:'showcase'}, cards(React, ids, heights)));};
  window.probe = {render:draw, unmount, setImage:(id, height)=>{heights[id]=height;draw(currentIds);}};
  draw(initialIds);
}
