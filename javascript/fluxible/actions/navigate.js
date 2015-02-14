module.exports = function (actionContext, payload, done) {
    actionContext.getRouteResource('/dashboard', 'testUid', function(){
        console.log('[navigate] get the route resource back');
    });

    actionContext.dispatch('CHANGE_ROUTE', payload);
    done();
};