const express = require('express')
const phoneStashLib  = require('./index.js')
phoneStashLib.PhoneStashLoadPhoneTemplate();
const app = express()
const port = 3000
const fs = require('fs');
const dummyDB = JSON.parse(fs.readFileSync(__dirname+ '/Database.json', 'utf8'));
app.use(express.static('Phone_configs'))
app.get('*', (req, res) =>{
    console.log(req.url)
    let mac = phoneStashLib.PhoneStashMacParser(req.url)
    console.log(mac)

    let phoneConf =LoadPhoneConfbyMacFromDB(mac)
    let phoneStash
    let TemplateName = ''
    let MyCode = ''
    if(phoneConf){
        phoneStash = new  phoneStashLib.phoneStash(phoneConf)
        phoneStash.Headers = req.headers
        let MyTarget = phoneStashLib.PhoneStashDirectoryParser(req.url)
        if(MyTarget && MyTarget!='') {
            console.log(phoneConf.PhoneTemplateName + "  " + phoneConf.MainTemplateName + " directory: " + MyTarget)
            TemplateName = MyTarget
    }
    let configBody = phoneStash.ReanderConfig()
    if(req.url.indexOf('Debug=True')>-1){
        configBody = '<b>Debug Mode</b><br/>'+req.url +'<br/>mac:'+ mac +'<br/>TemplateName:'+phoneStash.TemplateName+ '<br/>'+JSON.stringify(phoneStash)+'<br/>configBody:<br/>'+configBody
    }
    res.send(configBody)

    }
})

app.listen(port, () => console.log(`PhoneStash  WebServer Demo listening on port ${port}!`))


function LoadPhoneConfbyMacFromDB(mac) {

    return dummyDB[mac]

}
