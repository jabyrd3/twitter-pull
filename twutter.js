var Twit = require('twit');

var T = require('./config1.js');
var ping = new Twit(T);
var cursor = undefined;
var cursorCount = 0;
var getWithCursor = function(cursor){        
    if(cursorCount < 3){
        ping.get('statuses/user_timeline', { screen_name: T.handle, max_id: cursor, count: 200 },  function (err, reply) {
            for(x = 0; x < reply.length; x++){
                console.log(reply[x].text); 
                if(x === reply.length - 1){
                    cursor = reply[x].id - 3;
                    getWithCursor(cursor);
                }
            }
            cursorCount++;
        });
    }
}

ping.get('statuses/user_timeline', { screen_name: T.handle, count: 200 },  function (err, reply) {
    for(x = 0; x < reply.length; x++){
        console.log(reply[x].text);
        if(x === reply.length - 1){
            cursor = reply[x].id - 3;
            getWithCursor(cursor);
        }
    }
    cursorCount++;
})
