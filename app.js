// require packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')

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
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})