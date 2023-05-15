// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')

// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')
const usePassport = require('./config/passport')
const routes = require('./routes')

const app = express()
const port = 3000

// app engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

// after import, use in this project
app.use(express.static('public'))
app.use(session({
  secret: 'ThisIsMySecret', //session 用來驗證 session id 的字串
  resave: false, //當設定為 true 時，會在每一次與使用者互動後，強制把 session 更新到 session store 裡。
  saveUninitialized: true //強制將未初始化的 session 存回 session store。未初始化表示這個 session 是新的而且沒有被修改過，例如未登入的使用者的 session。
}))
usePassport(app)
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})