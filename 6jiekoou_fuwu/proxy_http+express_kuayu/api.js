// http.js
const http = require("http");
const fs = require("fs");
const app = http.createServer((req,res)=>{
    const { method, url } = req;
    // console.log('url:'+url); //打印出img的src
    if (method == "GET" && url == "/") {
        fs.readFile('./index.html',(err,data)=>{
            res.setHeader('Content-Type','text/html')
            res.end(data)
        })
    }else if(method == "GET" && url == "/api/users"){
        console.log('cookie',req.headers.cookie)
        res.setHeader('Set-Cookie', 'cookie1=va222;')
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')  //注释1
        res.setHeader('Content-Type','application/json')
        res.end(JSON.stringify([{name:'tom'}]))
    }else if (method === "POST" && url === "/api/save") {
        let reqData = [];
        let size = 0;
        req.on('data', data => {
            //console.log('>>>req on', data); //req on <Buffer 61 3d 31 26 62 3d 33>
            reqData.push(data);
            size += data.length;
        });
        req.on('end', function () {
            console.log('end')
            const data = Buffer.concat(reqData, size);
            console.log('data:', size, data.toString()) //data: 7 a=1&b=3
            res.end(`formdata:${data.toString()}`)
        });

    } else if (method === "POST" && url === "/api/upload") {

    }
})
module.exports = app