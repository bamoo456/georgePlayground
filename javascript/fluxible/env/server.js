var express = require('express');
var server = express();
var port = process.env.PORT || 3000;
var serialize = require('serialize-javascript');

// needed when we get the ".jsx" files
require('node-jsx').install({
    extension: '.jsx'
});

// require the fluxible app
var app = require('./app');

var React = require('react');


var HtmlComponent = React.createFactory(require('../components/Html.jsx'));


var navigateAction = require('flux-router-component').navigateAction;

server.use(express.static(__dirname + '/../build'));

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
        // for all registered stores, call the 'dehydrate' function
        var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

        // get the app component (mainApp.jsx)
        var appComponent = app.getAppComponent();

        return React.withContext(context.getComponentContext(), function(){
            // render the appComponent to an 'html' template
            var html = React.renderToStaticMarkup(HtmlComponent({
                state: exposed,
                markup: React.renderToString(appComponent())
            }));

            res.write(html);
            res.end();
        });
    });
});


server.listen(port);
console.log('Listening on port ' + port);
