function AddAppApi(
    appname,
    categoryid,
    appwebsite,
    appfacebook,
    appgithub,
    appdescription,
    appcreationdate,
    applogo,
    apptags,
    ngoname,
    ngophone,
    ngoemail,
    ngofacebook,
    ngogoogleplus,
    ngolinkedin,
    ngotwitter,
    ngoinstagram,
    ngodescription,
    ngologo
){
    this.appname = appname;
    this.categoryid = categoryid;
    this.appwebsite = appwebsite;
    this.appfacebook = appfacebook;
    this.appgithub = appgithub;
    this.appdescription = appdescription;
    this.appcreationdate = appcreationdate;
    this.applogo = applogo;
    this.apptags = apptags;
    this.ngoname = ngoname;
    this.ngophone = ngophone;
    this.ngoemail = ngoemail;
    this.ngofacebook = ngofacebook;
    this.ngogoogleplus = ngogoogleplus;
    this.ngolinkedin = ngolinkedin;
    this.ngotwitter = ngotwitter;
    this.ngoinstagram = ngoinstagram;
    this.ngodescription = ngodescription;
    this.ngologo = ngologo;
    
}

AddAppApi.prototype = {

    AddApp: function(res, seq){

        seq.query('CALL AddApp (:apname , :categoryid , :appwebsite , :appfacebook , :appgithub , :appdescription , :appcreationdate , :applogo , :apptags , :ngname , :ngophone , :ngoemail , :ngofacebook , :ngogoogleplus , :ngolinkedin , :ngotwitter , :ngoinstagram , :ngodescription , :ngologo );', {replacements: {
            apname: this.appname,
            categoryid: this.categoryid,
            appwebsite: this.appwebsite,
            appfacebook: this.appfacebook,
            appgithub: this.appgithub,
            appdescription: this.appdescription,
            appcreationdate: this.appcreationdate,
            applogo: this.applogo,
            apptags: this.apptags,
            ngname: this.ngoname,
            ngophone: this.ngophone,
            ngoemail: this.ngoemail,
            ngofacebook: this.ngofacebook,
            ngogoogleplus: this.ngogoogleplus,
            ngolinkedin: this.ngolinkedin,
            ngotwitter: this.ngotwitter,
            ngoinstagram: this.ngoinstagram,
            ngodescription: this.ngodescription,
            ngologo: this.ngologo
        }}).then(function(r){
            res.send(r[0]);
        }).catch(function(err){
            res.send({error: err});
        })

    }

}


module.exports = AddAppApi;