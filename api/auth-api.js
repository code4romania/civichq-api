var HashPass = require('password-hash-and-salt');
var ResponseFormatter = require('./response-formatter');
//https://www.npmjs.com/package/password-hash-and-salt
//https://github.com/florianheinemann/password-hash-and-salt/blob/master/lib/hashsalt.js

function AuthApi(secret, user, pass, sequalize, isdebug) {

    this.secret = secret;
    this.secretAsHex = ConvertToHex(this.secret);
    this.user = user;
    this.pass = pass;
    this.hashIntro = 'pbkdf2$10000$';
    this.sequalize = sequalize;
    this.isDebug = isdebug;
    this.authAgainstDb = authAgainstDb;
}

function ConvertToHex(str) {
    var hex, i;

    var result = "";
    for (i = 0; i < this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }

    return result
}

function authAgainstDb(myself, encryptedPass, callback) {
    var query = 'SELECT UserName, case when IsAdmin = 1 then \'true\' else \'false\' end AS IsAdmin from Users WHERE UserName = :username AND Password = :pass AND IsActive = 1;'
    myself.sequalize.query(query,
        {
            replacements: {
                username: myself.user,
                pass: encryptedPass
            },
            type: myself.sequalize.QueryTypes.SELECT
        })
        .then(function (dbusr) {
            var formatter = new ResponseFormatter(myself.isDebug);
            console.log('Printing usr ');
            console.log(dbusr);

            if (dbusr.length == 0) {
                callback(formatter.FormatError('Credentiale invalide!'));

            }
            else {
                callback(formatter.FormatSuccess(dbusr[0]));
            }

        })
        .catch(function (err) {
            var formatter = new ResponseFormatter(myself.isDebug);
            callback(formatter.FormatError(err));
        });
}


AuthApi.prototype = {

    GenerateHashForPass: function (res) {
        var myself = this;
        var myhash = [];
        HashPass(myself.pass).hash(myself.secretAsHex, function (err, hashedPass) {
            var formatter = new ResponseFormatter(myself.isDebug);
            if (err) {
                res.send(formatter.FormatError(err));
                return;
            }

            myhash = hashedPass.split('$');
            if (myself.isDebug) {
                console.log(hashedPass);
                console.log(myhash);
            }

            res.send(formatter.FormatSuccess(myhash[2]));

        });
    },
    Authenticate: function (callback) {
        var myhash = [];
        var myself = this;

        HashPass(myself.pass).hash(myself.secretAsHex, function (err, hashedPass) {
            var formatter = new ResponseFormatter(myself.isDebug);
            if (err) {
                callback(formatter.FormatError(err));
                return;
            }
            myhash = hashedPass.split('$');
            var encryptedPass = myhash[2];

            myself.authAgainstDb(myself, encryptedPass, callback);

        });

    }
}



module.exports = AuthApi;