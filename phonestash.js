exports.phoneStash =class phoneStash{
    constructor(phoneConfig){
        var _this =this
        
        this.AccountList =[]
        this.KeyList =[]
        // noinspection JSAnnotator 
        if(phoneConfig.AccountList && phoneConfig.AccountList.constructor.name==='Array'){
            phoneConfig.AccountList.forEach(function (accountConf) {
                let accountObj = new exports.PhoneStashAccount(accountConf)
                if(accountObj)_this.AccountList.push(accountObj)
            })
        }
        // noinspection JSAnnotator 
        if(phoneConfig.KeyList && phoneConfig.KeyList.constructor.name==='Array'){
            phoneConfig.KeyList.forEach(function (keyConf) {
                let keyObj = new exports.PhoneStashKey(keyConf)
                if(keyObj)_this.KeyList.push(keyObj)
            })
        }

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
            return null
        }
        // noinspection JSAnnotator
        if ( AccountConf.Password && AccountConf.Password.constructor.name==="String"){
            this.Password = AccountConf.Password
        }else {
            log.error("Password is not define for this account ",AccountConf)
            return null
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
            console.error("KeyNumber is not define for this account ",KeyConf)
            return null
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
/*
****************************************************************************
*                  Minimal    Phone config object  sample
* **************************************************************************
{
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
}*/


exports.PhoneStashMacParser = function (str) {
    str = str.replace(':','').replace('-','');
    var regex = /\b([0-9A-Fa-f]{2}){6}/; //http://www.regular-expressions.info/examples.html
    let mac = str.match(regex)[0]; // id = 'Ahg6qcgoay4'
    return mac
}