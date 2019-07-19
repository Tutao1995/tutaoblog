const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const router = require('./router/index')
const app = new Koa();

//跨域
app.use(async (ctx,next) => {
    ctx.set('Access-Control-Allow-Origin',"*");//允许所有路径的访问。
    ctx.set('Access-Control-Allow-Methods',"OPTIONS, GET, PUT, POST, DELETE");//允许访问的方法
    ctx.set('Access-Control-Allow-Headers',"x-requested-with, accept, origin, content-type,token");//允许访问的headers
    ctx.set('Content-type',"application/json");//接受的类型
    await next();//转移给下一个中间件。
}) 

//
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods())


app.listen(8888,function(){
    console.log(`service is running at 8888`)
})