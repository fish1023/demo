import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import mount from 'koa-mount'
import serve from 'koa-static'
import session from 'koa-generic-session'
import mysql from 'mysql'


import config from '../config'
import { errorMiddleware } from '../src/middleware'


const app = new Koa()
app.keys = [config.session]

// db
// mysql.init(config.database)

// log

app.use(bodyParser());
app.use(session());
app.use(errorMiddleware())

// 静态资源路由
app.use(convert(mount('/public', serve(`${process.cwd()}/public`))))


const modules = require('../src/modules')
modules(app)

app.listen(config.port, () => {
    console.log(`Server started on ${config.port}`)
})

export default app

