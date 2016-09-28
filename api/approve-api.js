var BaseAppQuery = require('./base-app-query');

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
                replacements: {appId: appId },
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

    }

}



module.exports = ApproveApi;