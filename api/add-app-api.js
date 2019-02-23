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
    apptechnologies,
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
    this.apptechnologies = apptechnologies;
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

        seq.query('CALL AddApp (:apname , :categoryid , :appwebsite , :appfacebook , :appgithub , :appdescription , :appcreationdate , :applogo , :apptags , :apptechnologies , :ngname , :ngophone , :ngoemail , :ngofacebook , :ngogoogleplus , :ngolinkedin , :ngotwitter , :ngoinstagram , :ngodescription , :ngologo );', {replacements: {
            apname: this.appname,
            categoryid: this.categoryid,
            appwebsite: this.appwebsite || null,
            appfacebook: this.appfacebook || null,
            appgithub: this.appgithub || null,
            appdescription: this.appdescription || null,
            appcreationdate: this.appcreationdate || null,
            applogo: this.applogo || null,
            apptags: this.apptags || null,
            apptechnologies: this.apptechnologies || null,
            ngname: this.ngoname,
            ngophone: this.ngophone || null,
            ngoemail: this.ngoemail,
            ngofacebook: this.ngofacebook || null,
            ngogoogleplus: this.ngogoogleplus || null,
            ngolinkedin: this.ngolinkedin || null,
            ngotwitter: this.ngotwitter || null,
            ngoinstagram: this.ngoinstagram || null,
            ngodescription: this.ngodescription || null,
            ngologo: this.ngologo || null
        }}).then(function(r){
            res.send(r[0]);
        }).catch(function(err){
            res.send({error: err});
        })

    }

}


module.exports = AddAppApi;