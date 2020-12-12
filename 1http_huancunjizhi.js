//web 缓存机制  为了避免资源浪费
//将静态资源存储在浏览器内部，下次请求相同的资源时可以直接使用

//强缓存策略 对比更新时间，设置静态资源有效期，不去请求服务器，返回的状态码是200
//expires 和 cache-control 都会访问本地缓存直接验证看是否过期，没过期返回200

//如果设置了no-cache 和 no-store 会去请求服务器验证资源是否更新，没更新返回304，协商缓存
//协商缓存主要包括last-modified & if-Modified(基于时间) 和 etag & if-None-Match(基于内容)

//实现思路：创建一个随时间变化的内容
function updateTime(){
    setInterval( () => this.time = new Date().toUTCString(),1000)
    return this.time
}

//创建一个web服务
const http = require('http')
http.createServer((req,res)=>{
    const {url} = req
    if(url === '/'){ //如果没有main.js的话，添加main.js
        res.end(`
            <html>
                Html Update Time ${updateTime()}
                <script src='main.js'></script>
            </html>
        `)
    }else if(url === '/main.js'){ //如果有main.js的话，走缓存
        const content = `document.writeln('<br>JS Update Time: ${updateTime()}')`
        res.setHeader('Expires',new Date(Date.now() + 10 * 1000).toUTCString()) //10秒后刷新
        res.statusCode = 200
        res.end(content)
    }else if(url === '/favicon.ico'){
        res.end('')
    }
}).listen(3000,()=>{
    console.log('Http Cache Test Run at '+ 3000)
})

//不使用缓存的时候html和js同步更新，使用缓存的话，js不会更新