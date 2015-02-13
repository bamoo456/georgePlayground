var React = require('react');
var Fluxible = require('fluxible');

/**
 * create an fluxible application
 */
var app = new Fluxible({
    appComponent: require('../configs/Routes.jsx')
});
 
/**
 * import the route plugin
 */
// app.plug(routrPlugin({
//     routes: require('../configs/routes')
// }));

/**
 * register stores
 */
app.registerStore(require('../stores/mainAppStore'));
 
module.exports = app;