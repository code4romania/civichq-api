var BaseAppQuery = require('./base-app-query');

function AppProfileApi() {
    var bq = new BaseAppQuery();
    this.baseAppQuery = bq.GetBaseAppQuery();

    this.baseWhere = ' WHERE a.IsApproved = 1 AND a.Id = :id';

}

AppProfileApi.prototype = {

    GetAppProfile: function (res, seq, id) {

        var appQuery = this.baseAppQuery + this.baseWhere;

        var p1 = seq.query(appQuery,
            {
                replacements: { id: id },
                type: seq.QueryTypes.SELECT,
                nest: true
            }
        )
            .then(function (a) {
                res.json(a[0])
            });

    },

    GetMasterProfile: function (res, seq) {
        var query = this.baseAppQuery + ' WHERE a.IsMaster = 1; ';

        seq.query(query, {
            type: seq.QueryTypes.SELECT,
            nest: true
        }).then(function (a) {
            res.json(a[0]);
        });

    }

}


module.exports = AppProfileApi;