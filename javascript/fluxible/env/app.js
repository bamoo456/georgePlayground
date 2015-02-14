var React = require('react');
var Fluxible = require('fluxible');
var routePlugin = require('../routes/routePlugin');

/**
 * create an fluxible application
 */
var app = new Fluxible({
    appComponent: require('../configs/Routes.jsx')
});

/**
 * import the data plugin
 */
app.plug(routePlugin);

/**
 * register stores
 */
app.registerStore(require('../stores/mainAppStore'));
 
module.exports = app;