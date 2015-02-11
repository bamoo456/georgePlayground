var React = require('react');
var Fluxible = require('fluxible');
var routrPlugin = require('fluxible-plugin-routr');

/**
 * create an fluxible application
 */
var app = new Fluxible({
    appComponent: React.createFactory(require('../components/MainApp.jsx'))
});
 
/**
 * import the route plugin
 */
app.plug(routrPlugin({
    routes: require('../configs/routes')
}));

/**
 * register stores
 */
app.registerStore(require('../stores/mainAppStore'));
 
module.exports = app;