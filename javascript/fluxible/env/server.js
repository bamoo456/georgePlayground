var express = require('express');
var server = express();
var port = process.env.PORT || 3000;

// require the fluxible app
var app = require('./app');

// needed when we get the ".jsx" files
require('node-jsx').install({
    extension: '.jsx'
});

var React = require('react');


var HtmlComponent = React.createFactory(require('../components/Html.jsx'));


var navigateAction = require('flux-router-component').navigateAction;

server.use(function(req, res, next) {
    var context = app.createContext();
    context.executeAction(navigateAction, {
        url: req.url
    }, function(err){
        if (err) {
            if (err.status && err.status === 404) {
                return next();
            }
            return next(err);
        }
        // get the app component (mainApp.jsx)
        var appComponent = app.getAppComponent();

        // render the appComponent to an 'html' template
        var html = React.renderToStaticMarkup(HtmlComponent({
            // markup will be seen as the "this.props.markup" in HtmlComponent
                markup: React.renderToString(appComponent({
                    // context will be seen as the "this.props.context" in appComponent
                    context: context.getComponentContext()
                }))
            }));
        res.send(html);
    });
});


server.listen(port);
console.log('Listening on port ' + port);
