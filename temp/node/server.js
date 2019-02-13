'use strict'

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const zlib = require('zlib')

// 处理静态资源
function processStatic(req, res) {
  const mime = {
    css: 'text/css',
    gif: 'image/gif',
    html: 'text/html',
    ico: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'text/javascript',
    json: 'application/json',
    pdf: 'application/pdf',
    png: 'image/png',
    svg: 'image/svg+xml',
    woff: 'application/x-font-woff',
    woff2: 'application/x-font-woff',
    swf: 'application/x-shockwave-flash',
    tiff: 'image/tiff',
    txt: 'text/plain',
    wav: 'audio/x-wav',
    wma: 'audio/x-ms-wma',
    wmv: 'video/x-ms-wmv',
    xml: 'text/xml'
  }

  const requestUrl = req.url
  let pathName = url.parse(requestUrl).pathname

  // 中文乱码处理
  pathName = decodeURI(pathName)
  let ext = path.extname(pathName)

  // 特殊 url 处理
  if (!pathName.endsWith('/') && ext === '' && !requestUrl.includes('?')) {
    pathName += '/'
    const redirect = `http://${req.headers.host}${pathName}`
    redirectUrl(redirect, res)
  }

  // 解释 url 对应的资源文件路径
  let filePath = path.resolve(__dirname + pathName)

  // 设置 mime
  ext = ext ? ext.slice(1) : 'unknown'
  const contentType = mime[ext] || 'text/plain'

  // 处理资源文件
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/html;charset=utf-8' })
      res.end('<h1>404 Not Found</h1>')
      return
    }
    // 处理文件
    if (stats.isFile()) {
      readFile(filePath, contentType, res)
    }
    // 处理目录
    if (stats.isDirectory()) {
      let html = "<head><meta charset = 'utf-8'/></head><body><ul>"
      // 遍历文件目录，以超链接返回，方便用户选择
      fs.readdir(filePath, (err, files) => {
        if (err) {
          res.writeHead(500, { 'content-type': contentType })
          res.end('<h1>500 Server Error</h1>')
        } else {
          for (let file of files) {
            if (file === 'index.html') {
              const redirect = `http://${req.headers.host}${pathName}index.html`
              redirectUrl(redirect, res)
            }
            html += `<li><a href='${file}'>${file}</a></li>`
          }
          html += '</ul></body>'
          res.writeHead(200, { 'content-type': 'text/html' })
          res.end(html)
        }
      })
    }
  })
}
// 处理代理列表
function processProxy(req, res) {
  const requestUrl = req.url
  const proxy = Object.keys(proxyTable)
  let not_found = true
  for (let index = 0; index < proxy.length; index++) {
    const k = proxy[index]
    const i = requestUrl.indexOf(k)
    if (i >= 0) {
      not_found = false
      const element = proxyTable[k]
      const newUrl = element.target + requestUrl.slice(i + k.length)
      // logger.log(requestUrl,'==>' ,newUrl)
      if (requestUrl !== newUrl) {
        const u = url.parse(newUrl, true)
        const options = {
          hostname: u.hostname,
          port: u.port || 80,
          path: u.path,
          method: req.method,
          headers: req.headers,
          timeout: 6000
        }
        if (element.changeOrigin) {
          options.headers['host'] = u.hostname + ':' + (u.port || 80)
        }

        // let options = {
        //   method: req.method,
        //   timeout: 6000,
        //   headers:req.headers
        // }
 
        // if (req.headers['cookie']) {
        //   options.headers['cookie'] = req.headers['cookie']
        // }

        // POST 请求需设置
        // if (req.headers['content-type']) {
        //   options.headers['content-type'] = req.headers['content-type']
        // }

        // if (req.headers['content-length']) {
        //   options.headers['content-length'] = req.headers['content-length']
        // }
            
        // const request = http
        //   .request(newUrl, options, response => {


        const request = http
          .request(options, response => {
            logger.log(requestUrl,'==>' , newUrl ,'==>' ,response.statusCode); 
            // cookie 处理
            if (element.changeOrigin && response.headers['set-cookie']) {
              response.headers['set-cookie'] = getHeaderOverride(
                response.headers['set-cookie']
              )
            }
            // zip 处理
            // if (response.headers['content-encoding'] === 'gzip') {
            //   zipFile(response)
            // }
            res.writeHead(response.statusCode, response.headers)
            response.pipe(res)
          })
          .on('error', err => {
            logger.error('error_url: ', err.message, requestUrl)
            res.statusCode = 503
            res.end()
          })
        req.pipe(request)
      }
      break
    }
  }
  return not_found
}
// 处理重定向列表
function processRedirect(req, res) {
  const requestUrl = req.url
  const proxy = Object.keys(redirectTable)
  let not_redirect = true
  for (let index = 0; index < proxy.length; index++) {
    const k = proxy[index]
    if (requestUrl === k) {
      not_redirect = false
      const newUrl = redirectTable[k].target
      logger.info(url,'-->' ,newUrl);
      if (requestUrl !== newUrl) {
        redirectUrl(newUrl, res)
      }
      break
    }
  }
  return not_redirect;
}

// 重定向处理
function redirectUrl(url, res) {
  url = encodeURI(url)
  res.writeHead(302, {
    location: url
  })
  res.end()
}
// 文件读取
function readFile(filePath, contentType, res) {
  res.writeHead(200, { 'content-type': contentType })
  const stream = fs.createReadStream(filePath)
  stream.on('error', function() {
    res.writeHead(500, { 'content-type': contentType })
    res.end('<h1>500 Server Error</h1>')
  })
  stream.pipe(res)
}

// cookie domain 重写
// https://gist.github.com/kvetis/720643949e389a47f9b6443126fdb872
function getHeaderOverride(value) {
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      value[i] = replaceDomain(value[i])
    }
  } else {
    value = replaceDomain(value)
  }
  return value
}
function replaceDomain(value) {
  return value
    .replace(/domain=[a-z.]*;/, 'domain=.localhost;')
    .replace(/secure/, '')
}

// zip
function zipFile(res) {
  var html = '',
    output
  if (res.headers['content-encoding'] == 'gzip') {
    var gzip = zlib.createGunzip()
    res.pipe(gzip)
    output = gzip
  } else {
    output = res
  }
  output.on('data', data => {
    data = data.toString('utf-8')
    html += data
  })
  output.on('end', () => {
    console.log(html)
  })
}

function compose(middleware) {
  if (!Array.isArray(middleware))
    throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function')
      throw new TypeError('Middleware must be composed of functions!')
  }
  return function(context, next) {
    // 记录上一次执行中间件的位置
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      // 理论上 i 会大于 index，因为每次执行一次都会把 i递增，
      // 如果相等或者小于，则说明next()执行了多次
      if (i <= index)
        return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(
          fn(context, function next() {
            return dispatch(i + 1)
          })
        )
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
function Router() {
  this.middleware = []
}
Router.prototype.use = function(fn) {
  if (typeof fn !== 'function')
    throw new TypeError('middleware must be a function!')
  this.middleware.push(fn)
  return this
}
Router.prototype.callback = function() {
  const fn = compose(this.middleware)
  const handleRequest = (req, res) => {
    const ctx = { req, res }
    return this.handleRequest(ctx, fn)
  }
  return handleRequest
}
Router.prototype.handleRequest = function(ctx, fn) {
  fn(ctx)
}

// 日志函数 
const loggerMethods = [
  [ 'warn','\x1b[35m' ],
  [ 'error', '\x1b[31m' ],
  [ 'log','\x1b[2m' ],
  [ 'debug', '\x1b[32m' ],
  [ 'info','\x1b[33m' ]
]
function Logger () {}
loggerMethods.forEach(function (pair) {
  const method = pair[0]
  const reset = '\x1b[0m'
  const color = '\x1b[36m' + pair[1]
  Logger.prototype[method] = function(...args){
    let prefix = [color]
    prefix = prefix.concat(args)
    prefix.push(reset)
    console[method](...prefix)
  }
})

// 代理列表
const proxyTable = {
  '/api': {
    target: 'http://127.0.0.1/api',
    changeOrigin: true
  }
}

// 重定向列表
const redirectTable = {
  '/index': {
    target:'/site/index.html'
  }
}

const port = 8080
const hostname = 'localhost'
const appRouter = new Router()
const logger = new Logger()

// 使用中间件
// 1 处理重定向 redirectTable
// 2 处理代理 proxyTable
// 3 处理静态资源 
appRouter
  .use(async (ctx,next)=>{
    // 日志
    logger.debug(ctx.req.method,ctx.req.url)
    next()
  })
  .use(async (ctx,next)=>{  
    if(processRedirect(ctx.req, ctx.res)){
      next()
    }
  })
  .use(async (ctx, next) => {
    if (processProxy(ctx.req, ctx.res)) {
      next()
    }
  })
  .use(async ctx => {
    processStatic(ctx.req, ctx.res)
  })

// 创建 http 服务
let httpServer = http.createServer(appRouter.callback())

// 设置监听端口
httpServer.listen(port, hostname, () => {
  console.log(`app is running at port:${port}`)
  console.log(`url: http://${hostname}:${port}`)
  cp.exec(`explorer http://${hostname}:${port}`, () => {})
})
