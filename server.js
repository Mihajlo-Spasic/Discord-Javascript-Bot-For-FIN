const express = require('express')
const server = express()
const port = 3000


server.all("/", (req, res) => {
  res.send('Bot is running KAR is working')
})

function keepAlive(){
  server.listen(3000, () => {
    console.log('Server is listening at port 3000')
  })
}

module.exports = keepAlive