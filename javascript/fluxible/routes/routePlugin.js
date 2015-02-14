var RouteInstance = (typeof window !== 'undefined') 
    ? require('../routes/clientRoutes')
    : require('../routes/serverRoutes')

var RoutesHandler = {
    '/dashboard': RouteInstance.getDashboard,
    '/channel': RouteInstance.getChannel
};

function isHandlerExist(path) {
    return !!RoutesHandler[path];
}

// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
function getArgs(rawArguments){
    var args = new Array(rawArguments.length);
    for(var i = 0; i < args.length; ++i) {
                //i is always valid index in the rawArguments object
        args[i] = rawArguments[i];
    }
    return args;
}

module.exports = {
    name: 'routePlugin',

    plugContext: function (options) {
        return {
            plugActionContext: function plugActionContext(actionContext) {

                actionContext.getRouteResource = function() {                    
                    if (!isHandlerExist) {
                        return callback(new Error('no match handler'));
                    }
                    var args = getArgs(arguments);
                    var path = args.shift();
                    return RoutesHandler[path].apply(this, args);
                }
            }
        }
    },

    // Allows dehydration of application plugin settings
    dehydrate: function () { return {}; },

    // Allows rehydration of application plugin settings
    rehydrate: function (state) {}
};