const dir = require('node-dir');
const Mustache = require('mustache')

exports.phoneStash =class phoneStash{
    constructor(phoneConfig){
        var _this =this

        this.AccountList =[]
        this.KeyList =[]
        this.Directory =[]
        this.TemplateName = ""
        this.PhoneTemplateName = ""
        this.MainTemplateName = ""
        this.Data = ""
        this.Headers={}
        this.MAC = phoneConfig.MAC
        let eend = Math.floor(Math.random() * 20) + 2;
        this.MyRandomString = Math.random().toString(eend)
        if(phoneConfig.MainTemplateName && phoneConfig.MainTemplateName.constructor.name==='String'){
            _this.TemplateName=phoneConfig.MainTemplateName;
        }
        if(phoneConfig.PhoneTemplateName && phoneConfig.PhoneTemplateName.constructor.name==='String'){
            _this.PhoneTemplateName=phoneConfig.PhoneTemplateName;
        }

        if(phoneConfig.Data && phoneConfig.Data.constructor.name==='Object'){
            _this.Data=phoneConfig.Data;
        }


        // noinspection JSAnnotator
        if(phoneConfig.AccountList && phoneConfig.AccountList.constructor.name==='Array'){
            let counter =0
            phoneConfig.AccountList.forEach(function (accountConf) {
                try{
                    let accountObj = new exports.PhoneStashAccount(accountConf)
                    counter++
                    accountObj.Index=counter
                    if(accountObj)_this.AccountList.push(accountObj)
                }catch (e){
                    console.error(e)
                }

            })
        }
        // noinspection JSAnnotator
        if(phoneConfig.KeyList && phoneConfig.KeyList.constructor.name==='Array'){
            let counter =0
            phoneConfig.KeyList.forEach(function (keyConf) {
                try{
                    let keyObj = new exports.PhoneStashKey(keyConf)
                    counter++
                    keyObj.Index=counter
                    if(keyObj)_this.KeyList.push(keyObj)
                }catch (e){
                    console.error(e)
                }

            })
        }
        // noinspection JSAnnotator
        if(phoneConfig.Directory && phoneConfig.Directory.constructor.name==='Array'){
            let counter =0
            phoneConfig.Directory.forEach(function (keyConf) {
                try{
                    let keyObj = new exports.PhoneStashDirectory(keyConf)
                    counter++
                    keyObj.Index=counter
                    if(keyObj)_this.Directory.push(keyObj)
                }catch (e){
                    console.error(e)
                }

            })
        }

    }
    ReanderConfig(templatename){
        if(!templatename || templatename == '')
            templatename = this.TemplateName
       console.log("templatename:->" + templatename)
        return  Mustache.render(global.Templates[templatename], this);

    }



}
exports.PhoneStashAccount =class PhoneStashAccount {
    constructor(AccountConf) {
        this.User=""
        this.Password=""
        this.Domain=""
        this.Data={}
        this.Index = 0
        // noinspection JSAnnotator
        if ( AccountConf.User && AccountConf.User.constructor.name==="String"){
            this.User = AccountConf.User
        }else {
            log.error("User is not define for this account ",AccountConf)
            throw  Error('User is not define for this account');
        }
        if ( AccountConf.Domain && AccountConf.Domain.constructor.name==="String"){
            this.Domain = AccountConf.Domain
        }else {
            log.error("Domain is not define for this account ",AccountConf)
            throw  Error('Domain is not define for this account');
        }
        // noinspection JSAnnotator
        if ( AccountConf.Password && AccountConf.Password.constructor.name==="String"){
            this.Password = AccountConf.Password
        }else {
            log.error("Password is not define for this account ",AccountConf)
            throw  Error('Password is not define for this account');
        }
        // noinspection JSAnnotator
        if ( AccountConf.Data && AccountConf.Data.constructor.name==="Object"){
            this.Data = AccountConf.Data
        }


    }
}
exports.PhoneStashKey =class PhoneStashKey {
    constructor(KeyConf) {
        this.KeyNumber=""
        this.KeyName=""
        this.Data={}
        this.Index = 0
        // noinspection JSAnnotator
        if ( KeyConf.KeyNumber && KeyConf.KeyNumber.constructor.name==="String"){
            this.KeyNumber = KeyConf.KeyNumber
        }else {
            console.error("KeyNumber is not define for this Key ",KeyConf)
            throw  Error('KeyNumber is not define for this Key ');
        }
        // noinspection JSAnnotator
        if ( KeyConf.KeyName && KeyConf.KeyName.constructor.name==="String"){
            this.KeyName = KeyConf.KeyName
        }
        // noinspection JSAnnotator
        if ( KeyConf.Data && KeyConf.Data.constructor.name==="Object"){
            this.Data = KeyConf.Data
        }


    }
}

exports.PhoneStashDirectory =class PhoneStashDirectory {
    constructor(KeyConf) {
        this.LastName=""
        this.FirstName=""
        this.Contact=""
        this.RingType=""
        this.BLF=""
        this.BlockBLF=""
        this.Index = 0
        // noinspection JSAnnotator
        if ( KeyConf.Contact && KeyConf.Contact.constructor.name==="String"){
            this.Contact = KeyConf.Contact
        }else {
            console.error("Contact is not define for this Key ",KeyConf)
            throw  Error('Contact is not define for this Key ');
        }
        // noinspection JSAnnotator
        if ( KeyConf.LastName && KeyConf.LastName.constructor.name==="String"){
            this.LastName = KeyConf.LastName
        }
        // noinspection JSAnnotator
        if ( KeyConf.FirstName && KeyConf.FirstName.constructor.name==="String"){
            this.FirstName = KeyConf.FirstName
        }
        // noinspection JSAnnotator
        if ( KeyConf.RingType && KeyConf.RingType.constructor.name==="String"){
            this.RingType = KeyConf.RingType
        }
        // noinspection JSAnnotator
        if ( KeyConf.BLF && KeyConf.BLF.constructor.name==="String"){
            this.BLF = KeyConf.BLF
        }
        // noinspection JSAnnotator
        if ( KeyConf.BlockBLF && KeyConf.BlockBLF.constructor.name==="String"){
            this.BlockBLF = KeyConf.BlockBLF
        }


    }
}

exports.PhoneStashMacParser = function (str) {
    str = str.replace(':','').replace('-','');
    var regex = /\b([0-9A-Fa-f]{2}){6}/; //http://www.regular-expressions.info/examples.html
    let mac = str.match(regex)[0]; // id = 'Ahg6qcgoay4'
    return mac
}
exports.PhoneStashDirectoryParser = function (str) {
    str = str.replace(':','').replace('-','');
    var regex = /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/; //http://www.regular-expressions.info/examples.html
    console.log(str.match(regex)[3])
    let target = str.match(regex)[3]; // id = 'Ahg6qcgoay4'
    return target
}


exports.PhoneStashLoadPhoneTemplate = function (dirName) {
    let templates={}
    if(!dirName)dirName="templates"
    if(__dirname.indexOf('node_modules')>-1){
        dirName=   __dirname+'/../../'+dirName
    }else{
        dirName=   __dirname+'/'+dirName
    }

    dir.readFiles(dirName ,
        function(err, content, filename, next) {
            let fileNamestrArray = filename.replace('/','\\').split(/[//$]/)

            let fileName = fileNamestrArray[fileNamestrArray.length-1].split('.')[0]
            if (err) throw err;
            templates[fileName]=content
            console.log('content:', content);
            next();
        },
        function(err, files){
            if (err) throw err;
            console.log('finished reading files:', files);
            global.Templates = templates
            console.log(Object.keys(templates));
        });


}