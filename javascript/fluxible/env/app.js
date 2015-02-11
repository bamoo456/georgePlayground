var React = require('react');
var Fluxible = require('fluxible');
var routrPlugin = require('fluxible-plugin-routr');
 
require('node-jsx').install({
    extension: '.jsx'
});

var app = new Fluxible({
    appComponent: React.createFactory(require('../components/MainApp.jsx'))
});
 
app.plug(routrPlugin({
    routes: require('../configs/routes')
}));
 
app.registerStore(require('../stores/mainAppStore'));
 
module.exports = app;