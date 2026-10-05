import React from 'react';
import {createRoot} from 'react-dom/client';
import {flushSync} from 'react-dom';
import MasonryAdapter from './MasonryAdapter.jsx';
import {expose, initialIds} from './fixtures.mjs';
const root = createRoot(document.getElementById('root'));
expose(React, element=>root.render(<React.StrictMode>{element}</React.StrictMode>), ()=>root.unmount(), MasonryAdapter);

if (new URLSearchParams(location.search).has("cancel")) {
  flushSync(()=>window.probe.render(initialIds));
  window.probe.unmount();
}
