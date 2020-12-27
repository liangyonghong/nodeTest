let express = require('express');
let app = express();
let whitList = ['http://localhost:3000']  //白名单方式
app.use(function(req,res,next){
    let origin = req.headers.origin;
    if(whitList.includes(origin)){   //include包含的话可以访问
        // 设置那个源可以访问我
        res.setHeader('Access-Control-Allow-Origin',origin);
        // 允许携带哪个头访问我
        res.setHeader('Access-Control-Allow-Headers','name');
        // 允许哪个方法访问我
        res.setHeader('Access-Control-Allow-Methods','PUT');
        // 预检的存活时间
        res.setHeader('Access-Control-Max-Age',6);
        // 允许携带cookie
        res.setHeader('Access-Control-Allow-Credentials',true);
        // 允许返回的头
        res.setHeader('Access-Control-Expose-Headers','name');
        if(req.methods === 'OPTIONS'){
            res.end(); //OPTIONS请求不做任何处理
        }
    }
    next();
})
app.get('/getData',function(req,res){
    console.log(req.headers);
    res.end('我不爱你')
})
app.put('/getData',function(req,res){
    console.log(req.headers);
    res.setHeader('name','lyh2');  //在接口的header里查看
    res.end('我不爱你')
})
app.use(express.static(__dirname));
app.listen(4000); 