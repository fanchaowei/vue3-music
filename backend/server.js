/* eslint-env node */
const express = require('express')
const registerRouter = require('./router')

const port = 3000
const app = express()

registerRouter(app)

app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
