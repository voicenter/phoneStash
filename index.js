console.log(this)
const express = require('express')
const phoneStashLib  = require('./phonestash')
const app = express()
const port = 3000
const fs = require('fs');
const dummyDB = JSON.parse(fs.readFileSync('Database.json', 'utf8'));

app.get('*', (req, res) =>{

    let mac = phoneStashLib.PhoneStashMacParser(req.url)
    console.log(mac)
    let phoneConf =LoadPhoneConfbyMacFromDB(mac)
    let phoneStash
    if(phoneConf){
        phoneStash = new  phoneStashLib.phoneStash(phoneConf)
    }
    res.send('Hello World ->'+mac+'<br/>'+JSON.stringify(phoneStash))

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function LoadPhoneConfbyMacFromDB(mac) {

    return dummyDB[mac]

}
