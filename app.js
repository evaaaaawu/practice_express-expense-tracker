// require packages used in the project
const express = require('express')

const routes = require('./routes')

const app = express()
const port = 3000

// routes setting
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})