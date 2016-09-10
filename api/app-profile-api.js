var AppProfileApi = function () {

    this.baseAppQuery = 'SELECT a.id, a.AppName as name, a.website, a.facebook, a.creationdate, a.Logo as logoname, a.description, c.Id as categoryid, c.CatName as categoryname, a.tags FROM Apps a INNER JOIN Categories c on a.CategoryId = c.Id ';

    this.baseNgoQuery = 'SELECT n.NgoName as name, n.phone, n.email, n.facebook, n.googleplus, n.linkedin, n.twitter, n.instagram, n.description, n.logo as logoname FROM Ngos n INNER JOIN Apps a on n.Id = a.NgoId ';

    this.baseWhere = ' WHERE a.Id = :id';

}

AppProfileApi.prototype = {

    GetAppProfile: function (res, seq, id) {
        var appQuery = this.baseAppQuery + this.baseWhere;
        var ngoQuery = this.baseNgoQuery + this.baseWhere;

        var app = {}
        var ngo = {}

        var p1 = seq.query(appQuery,
            {
                replacements: { id: id },
                type: seq.QueryTypes.SELECT
            }
        )
            .then(function (a) {
                app = a[0];
            });
        var p2 = seq.query(ngoQuery,
            {
                replacements: { id: id },
                type: seq.QueryTypes.SELECT
            }
        )
            .then(function (n) {
                ngo = n[0];
            });

        Promise.all([p1, p2]).then(() => {

            res.json({
                appdetail: app,
                ngodetail: ngo
            });
        }
        )
    },

    GetMasterProfile: function (seq) {


    }

}


module.exports = AppProfileApi;