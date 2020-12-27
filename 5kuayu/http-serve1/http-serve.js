const http = require("http");
const fs = require("fs");
http.createServer((req, res) => {
    const { method, url } = req;
    console.log('method：',method)
    console.log('cookie',req.headers.cookie)
    if (method == "GET" && url == "/") {
      fs.readFile("./index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
});
} else if (method == "GET" && url == "/users") {
    setHeader(res);
    //注意：设置完以后在network的header里查看cookie,用set-cookie的时候不能用*
    res.setHeader('Set-Cookie', 'cookie1=va222111')
    res.end(JSON.stringify([{ name: "tom", age: 20 }]));
}
else if (method == "OPTIONS" && url == "/users") {
  setHeader(res);
  res.end();
}
})
.listen(3000);

function setHeader(res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:53027')
  res.setHeader('Access-Control-Allow-Headers', 'X-Token,Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}
