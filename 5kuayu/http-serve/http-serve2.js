const http = require("http");
const fs = require("fs");
http.createServer((req, res) => {
    const { method, url } = req;
    console.log('method：',method)
    if (method == "GET" && url == "/") {
      fs.readFile("./index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
});
} else if (method == "GET" && url == "/users") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify([{ name: "tom", age: 20 }]));
}
else if (method == "OPTIONS" && url == "/users") {
  setHeader(res);
  res.end();
}
})
.listen(3000);

function setHeader(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'X-Token,Content-Type')
}