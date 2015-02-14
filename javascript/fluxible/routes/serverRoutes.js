

exports.getDashboard = function(uid, callback){
    console.log('[routesHandler]  server Routes get dashboard', callback);
    setTimeout(function(){
        callback();
    }, 100);
}


exports.getChannel = function(uid, channelId, callback){
    console.log('[routesHandler]  server Routes get channel');
}
