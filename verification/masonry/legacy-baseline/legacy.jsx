import React from 'react';
import ReactDOM from 'react-dom';
import Masonry from 'react-masonry-component';
import {expose} from '../fixtures.mjs';
const root = document.getElementById('root');
expose(React, element=>ReactDOM.render(element, root), ()=>ReactDOM.unmountComponentAtNode(root), Masonry);
