let express = require('express');
let app = express();
let WebSocket = require('ws');
let wss = new WebSocket.Server({port:3000});
wss.on('connection',function(ws){
    ws.on('message',function(data){   //服务器接收
        console.log(data); //我爱你
        ws.send('我不爱你')   //服务器发送
    })
})

// app.use(express.static(__dirname));
// app.listen(3000); 