const express = require('express')
const phoneStashLib  = require('./phoneStash')
phoneStashLib.PhoneStashLoadPhoneTemplate();
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
    let configBody = phoneStash.ReanderConfig()
    if(req.url.indexOf('Debug=True')>-1){
        configBody = '<b>Debug Mode</b><br/>'+req.url +'<br/>mac:'+ mac +'<br/>TemplateName:'+phoneStash.TemplateName +'<br/>configBody:<br/>'+configBody
    }
    res.send(configBody)

})

app.listen(port, () => console.log(`PhoneStash  WebServer Demo listening on port ${port}!`))


function LoadPhoneConfbyMacFromDB(mac) {

    return dummyDB[mac]

}
