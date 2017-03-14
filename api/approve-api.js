var BaseAppQuery = require('./base-app-query');
var ResponseFormatter = require('./response-formatter');

function ApproveApi() {

}

ApproveApi.prototype = {

    Apps: function (res, seq) {

        var bq = new BaseAppQuery();
        var selectquery = bq.GetBaseAppQuery();
        var queryend = ' WHERE a.IsMaster = 0 ORDER BY COALESCE(a.IsApproved,0)';
        var query = selectquery + queryend;

        var p1 = seq.query(query,
            {
                type: seq.QueryTypes.SELECT,
                nest: true
            }
        )
            .then(function (apps) {
                res.json(apps)
            });


    },

    UpdateApp: function (res, seq, appId) {
        var query = 'UPDATE Apps set IsApproved = !IsApproved WHERE Id = :appId ;';

        var p1 = seq.query(query,
            {
                replacements: { appId: appId },
                type: seq.QueryTypes.UPDATE
            }
        )
            .then(function (rez) {
                res.json({ success: true });
            },
            function (err) {
                res.send({
                    success: false,
                    error: err
                });
            });

    },

    EditApp: function (res, seq, reqBody, logoSavePath, isDebug) {
        var resp = new ResponseFormatter(isDebug);
        console.log(JSON.stringify(reqBody, null, 4));
        seq.query('CALL EditApp (:appid,  :apname , :categoryid , :appwebsite , :appfacebook , :appgithub , :appdescription , :appcreationdate , :applogo , :apptags , :ngname , :ngophone , :ngoemail , :ngofacebook , :ngogoogleplus , :ngolinkedin , :ngotwitter , :ngoinstagram , :ngodescription , :ngologo, :ngoid );', {
            replacements: {
                appid: reqBody.appid,
                apname: reqBody.appname,
                categoryid: reqBody.appcategoryid,
                appwebsite: reqBody.appwebsite || null,
                appfacebook: reqBody.appfacebook || null,
                appgithub: reqBody.appgithub || null,
                appdescription: reqBody.appdescription || null,
                appcreationdate: reqBody.appcreationdate || null,
                applogo: logoSavePath + reqBody.applogoname || null,
                apptags: reqBody.apphashtags || null,
                ngname: reqBody.ngoname,
                ngophone: reqBody.ngophone || null,
                ngoemail: reqBody.ngoemail,
                ngofacebook: reqBody.ngofacebook || null,
                ngogoogleplus: reqBody.ngogoogleplus || null,
                ngolinkedin: reqBody.ngolinkedin || null,
                ngotwitter: reqBody.ngotwitter || null,
                ngoinstagram: reqBody.ngoinstagram || null,
                ngodescription: reqBody.ngodescription || null,
                ngologo: logoSavePath + reqBody.ngologoname || null,
                ngoid: reqBody.ngoid
            }
        }).then(function (rez) {
            resp.FormatFromResult(res, rez[0].result);
            
        })
            .catch(
            function (err) {
                res.send(resp.FormatError(err));
            }
            );
    }

}



module.exports = ApproveApi;