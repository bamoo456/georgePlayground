

exports.getDashboard = function(uid, callback){
    console.log('[routesHandler]  client Routes get dashboard');
    setTimeout(function(){
        callback();
    }, 100);
}


exports.getChannel = function(uid, channelId, callback){
    console.log('[routesHandler]  client Routes get channel');
}
