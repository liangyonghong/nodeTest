//1.浏览器认证请求服务器
//2.服务器重定向github认证
//3.浏览器第三方认证github服务器
//4.github服务器回调带认证code给服务器
//5.服务器用code申请令牌
//6.github服务器返回令牌给服务器
//7.浏览器刷新页面，完成登录

const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const app = new Koa();
const axios = require('axios')
const querystring = require('querystring')

app.use(static(__dirname + '/'));

//github配置目录：Settings Developer settings AuthTest
//homepage url: http://localhost:3000
//callback url: http://localhost:7001/auth/github/callback
const config = {
    client_id: "8392b7f057aaaac6d3ff",
    client_secret: "de2cc479126fda0903751a0843681a9d511f0a21"
};
router.get("/users/login-github", async ctx => { //123.重定向到认证接口,并配置参数(重定向到微信服务器)
    const path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}`;
    //转发到授权服务器（跳转到微信服务器）
    ctx.redirect(path);
});
router.get("/auth/github/callback", async ctx => {
    const code = ctx.query.code; //4.随机的code：7affb30319d6c011167e
    const params = { //认证参数
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    };
    //5.服务器用code申请令牌
    let res = await axios.post("https://github.com/login/oauth/access_token",params);  //6.
    const access_token = querystring.parse(res.data).access_token;  //证明登录的合法性
    res = await axios.get("https://api.github.com/user?access_token=" + access_token); //7.获取用户信息
    ctx.body = `
        <h1>Hello ${res.data.login}</h1>
        <img src="${res.data.avatar_url}" alt=""/>
    `
});
app.use(router.routes()); /*启动路由*/
app.listen(7001);


