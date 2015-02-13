'use strict';
var React = require('react');
var app = require('./app');
var dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support

var Router = require('react-router');
var HistoryLocation = Router.HistoryLocation;
var navigateAction = require('../actions/navigate');

/**
 * rehydrate datas from server
 */
app.rehydrate(dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    window.context = context;
    var mountNode = document.getElementById('app');

    // start the react-router
    Router.run(app.getAppComponent(), HistoryLocation, function (Handler, state) {
        context.executeAction(navigateAction, state, function () {
            React.withContext(context.getComponentContext(), function () {
                React.render(React.createFactory(Handler)(), mountNode);
            });
        });
    });
});