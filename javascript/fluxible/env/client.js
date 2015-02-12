'use strict';
var React = require('react');
var app = require('./app');
var dehydratedState = window.App; // Sent from the server

window.React = React; // For chrome dev tool support

/**
 * rehydrate datas from server
 */
app.rehydrate(dehydratedState, function(err, context){
    if (err) {
        throw err;
    }
    window.context = context;
    var mountNode = document.getElementById('app');
    React.withContext(context.getComponentContext(), function(){
        React.render(app.getAppComponent()(), mountNode);
    });
});