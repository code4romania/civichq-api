require('./base-app-query');

var ApproveApi = function () {

}

ApproveApi.prototype = {

    GetAppList: function (res, seq) {

        var bq = new BaseAppQuery();
        var selectquery = bq.GetBaseAppQuery();
        var queryend = ` WHERE a.IsMaster = 0
                    ORDER BY COALESCE(a.IsApproved,0)`
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


    }

}



module.exports = ApproveApi;