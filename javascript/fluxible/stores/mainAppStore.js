/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var createStore = require('fluxible/utils/createStore');
 
var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        // when someone exec "navigateAction", the fluxible router will
        // trigger 'CHANGE_ROUTE_SUCCESS' event
        'CHANGE_ROUTE_SUCCESS': 'handleNavigate'
    },
    initialize: function (dispatcher) {
        this.currentPageName = null;
        this.currentPage = null;
        this.currentRoute = null;
        this.pages = require('../configs/routes');
    },
    handleNavigate: function (route) {
        var pageName = route.name;
        var page = this.pages[pageName];
 
        if (pageName === this.getCurrentPageName()) {
            return;
        }
 
        this.currentPageName = pageName;
        this.currentPage = page;
        this.currentRoute = route;
        this.emitChange();
    },
    getCurrentPageName: function () {
        return this.currentPageName;
    },
    getState: function () {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            route: this.currentRoute
        };
    }
});
 
module.exports = ApplicationStore;