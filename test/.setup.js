require('babel-register')();

var jsdom = require('jsdom').jsdom;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

/* DISABLE CSS Parsing ? */
require.extensions['.css'] = () => null
/* DISABLE CSS Parsing ? */

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
