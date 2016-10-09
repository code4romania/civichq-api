var HashPass = require('password-hash-and-salt');
var ResponseFormatter = require('./response-formatter');
//https://www.npmjs.com/package/password-hash-and-salt
//https://github.com/florianheinemann/password-hash-and-salt/blob/master/lib/hashsalt.js

function AuthApi(secret, user, pass, sequalize) {

    this.secret = secret;
    this.secretAsHex = ConvertToHex(this.secret);
    this.user = user;
    this.pass = pass;
    this.hashIntro = 'pbkdf2$10000$';
    this.sequalize = sequalize;
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



AuthApi.prototype = {

    GenerateHashForPass: function (res, isdebug) {

        var myhash = [];
        HashPass(this.pass).hash(this.secretAsHex, function (err, hashedPass) {
            var formatter = new ResponseFormatter(isdebug);
            if (err) {
                res.send(formatter.FormatError(err));
                return;
            }

            myhash = hashedPass.split('$');
            if (isdebug) {
                console.log(hashedPass);
                console.log(myhash);
            }

            res.send(formatter.FormatSuccess(myhash[2]));

        });


    },
    Authenticate: function (isdebug, callback) {

        var myhash = [];
        var user = this.user;
        var pass = this.pass;
        var seq = this.sequalize;
        

        HashPass(this.pass).hash(this.secretAsHex, function (err, hashedPass) {
            var formatter = new ResponseFormatter(isdebug);
            if (err) {
                callback(formatter.FormatError(err));
                return;
            }
            myhash = hashedPass.split('$');
            var encryptedPass = myhash[2];

            var query = 'SELECT UserName, case when IsAdmin = 1 then \'true\' else \'false\' end AS IsAdmin from Users WHERE UserName = :username AND Password = :pass AND IsActive = 1;'
            seq.query(query,
                {
                    replacements: {
                        username: user,
                        pass: encryptedPass
                    },
                    type: seq.QueryTypes.SELECT
                })
                .then(function (dbusr) {
                    var formatter = new ResponseFormatter(isdebug);
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
                    var formatter = new ResponseFormatter(isdebug);
                    callback(formatter.FormatError(err));
                });

        });


    }
}


module.exports = AuthApi;