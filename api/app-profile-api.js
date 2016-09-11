var AppProfileApi = function () {

    this.baseAppQuery = 'SELECT a.id as \'appdetail.id\',' +
            'a.AppName as \'appdetail.name\',' +
            'a.website as \'appdetail.website\',' +
            'a.facebook as \'appdetail.facebook\',' + 
            'a.creationdate as \'appdetail.creationdate\',' +
            'a.Logo as \'appdetail.logoname\',' +
            'a.description as \'appdetail.description\',' +
            'c.Id as \'appdetail.categoryid\',' +
            'c.CatName as \'appdetail.categoryname\',' +
            'a.tags as \'appdetail.hashtags\',' +
            'a.github as \'appdetail.github\',' +
            'n.NgoName as \'ngodetail.name\',' +
            'n.phone as \'ngodetail.phone\',' +
            'n.email as \'ngodetail.email\',' +
            'n.facebook as \'ngodetail.facebook\',' +
            'n.googleplus as \'ngodetail.googleplus\',' +
            'n.linkedin as \'ngodetail.linkedin\',' +
            'n.twitter as \'ngodetail.twitter\',' +
            'n.instagram as \'ngodetail.instagram\',' +
            'n.description as \'ngodetail.description\',' +
            'n.logo as \'ngodetail.logoname\'' +
            'FROM Apps a INNER JOIN Categories c on a.CategoryId = c.Id ' +
            'INNER JOIN Ngos n on a.NgoId = n.Id '; 
    
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
            }).then(function(a){
                res.json(a[0]);
            });

    }

}


module.exports = AppProfileApi;