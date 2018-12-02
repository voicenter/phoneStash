# phoneStash
phoneStash is the First Multi Vendor Voip Phone configuration Parser Based on Node.JS
This project contain lib + simple webService based of mustache.js

for test copy templates dir and Database.json to the main folder and   run ServerDemo.js 
 than browse to:
`http://127.0.0.1:3000/123456789012.cfg?Debug=True`
or 
`http://127.0.0.1:3000/123456789012.cfg`
/*
****************************************************************************
Minimal    Phone config object  sample
* **************************************************************************
`````
{
    "TemplateName": "vvx300"
    "KeyList": [
    {
        "KeyNumber": "101",
        "KeyName": ""
        "Data" : {}
    }
],
    "AccountList": [
    {
        "User": "alex",
        "Domain": "sip.voip.com",
        "Password": "WeLoveSIP",
        "Data": {},

    }
]
}
````````````````
Demo Server implementation 
`````````````

const express = require('express')
const phoneStashLib  = require('phoneStash')
phoneStashLib.PhoneStashLoadPhoneTemplate("templates");
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



````````````` 
