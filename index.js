console.log(this)
const express = require('express')
const phoneStashLib  = require('./phonestash')
const app = express()
const port = 3000

app.get('*', (req, res) =>{

    let mac = phoneStashLib.PhoneStashMacParser(req.url)
    console.log(mac)
    res.send('Hello World ->'+mac+'<br/>'+req.url)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))