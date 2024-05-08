// 安装npm i express-session
const express = require('express')
const app = express()


const session = require('session')
// 当express - session 中间件配置成功后，即可通过 req.session 来访问和使用 session 对象，从而存储用户的关键信息
app.use(session({
    secret: 'keyboard cat',// secret 属性的值可以为任意字符串
    resave: false,// 固定写法
    saveUninitialized: true // 固定写法
}))
// 登录
app.post('/api/login', (req, res) => {
    // 判断用户提交的登录信息是否正确
    if (req.body.username !== 'admin' || req.body.password !== '000000') {
        return res.send({ status: 1, msg: "登录失败" })
    }
    // 请将登录成功后的用户信息，保存到 session 中
    // 注意: 只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
    req.session.user = req.body
    // 用户的信息
    req.session.islogin = true
    // 用户的登录状态
    res.send({status: 0, msg: '登录成功'}) 
})
// 获取用户名称
app.get('/api/login', (req, res) => {
    if (!req.session.islogin) {
        res.send({status:1,msg:'fail'})
    }
    res.send({ status: 0, msg: 'success', username: req.session.user.username })
})
// 退出登录
app.post('/api/logout', (req, res) => {
    // 清空当前客户端对应的 session 信息
    req.session.destroy()
    res.send({
        status: 0, msg: "退出登录成功"
    })
})

app.listen(80, () => {
    console.log('ok');
})