let express = require('express');
let app = express();

app.get('/say',function(req,res){
    let {wd,cb} = req.query;
    console.log(wd);  //我爱你
    res.end(`${cb}('我不爱你')`);
})
app.get('/list',(req,res)=>{
    let {callback=Function.prototype} = req.query;
    var data = {
        code:0,
        message:'lyh'
    }
    res.send(`${callback}(${JSON.stringify(data)})`)
})
app.listen(3000); 