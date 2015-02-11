
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


server.js
    ->context.executeAction(navigateAction, {route}, callback)

        // 1> reading the routes.js now to get the route
                route =     home: {
                        path: '/',
                        method: 'get',
                        page: 'home'
                    },

        // 2> try redirect to mainAppStore.handleNavigate(route)
        //       here is to update the state of mainAppStore

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

        // 3> after update complete, exec callback

    -> currently, the mainAppStore already got updated, so we simply
        get the mainAppView, and render it to string then sent it back to client


