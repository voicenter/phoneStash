const dir = require('node-dir');
const Mustache = require('mustache')

exports.phoneStash =class phoneStash{
    constructor(phoneConfig){
        var _this =this
        
        this.AccountList =[]
        this.KeyList =[]
        this.TemplateName = ""
        if(phoneConfig.TemplateName && phoneConfig.TemplateName.constructor.name==='String'){
            _this.TemplateName=phoneConfig.TemplateName;
        }


            // noinspection JSAnnotator
        if(phoneConfig.AccountList && phoneConfig.AccountList.constructor.name==='Array'){
            phoneConfig.AccountList.forEach(function (accountConf) {
              try{
                  let accountObj = new exports.PhoneStashAccount(accountConf)
                  if(accountObj)_this.AccountList.push(accountObj)
              }catch (e){
                  console.error(e)
              }

            })
        }
        // noinspection JSAnnotator 
        if(phoneConfig.KeyList && phoneConfig.KeyList.constructor.name==='Array'){
            phoneConfig.KeyList.forEach(function (keyConf) {
                try{
                    let keyObj = new exports.PhoneStashKey(keyConf)
                    if(keyObj)_this.KeyList.push(keyObj)
                }catch (e){
                    console.error(e)
                }

            })
        }

    }
    ReanderConfig(){
      return  Mustache.render(global.Templates[this.TemplateName], this);

    }



}
exports.PhoneStashAccount =class PhoneStashAccount {
    constructor(AccountConf) {
        this.User=""
        this.Password=""
        this.Data={}
        // noinspection JSAnnotator
        if ( AccountConf.User && AccountConf.User.constructor.name==="String"){
            this.User = AccountConf.User
        }else {
            log.error("User is not define for this account ",AccountConf)
            throw  Error('User is not define for this account');
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

exports.PhoneStashMacParser = function (str) {
    str = str.replace(':','').replace('-','');
    var regex = /\b([0-9A-Fa-f]{2}){6}/; //http://www.regular-expressions.info/examples.html
    let mac = str.match(regex)[0]; // id = 'Ahg6qcgoay4'
    return mac
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
            let fileNamestrArray = filename.replace('/','\\').split('\\')
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
        });


}