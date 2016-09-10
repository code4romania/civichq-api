var SearchApi = function () {
    this.baseQuery = 'SELECT c.Id as CategoryId, c.CatName as CategoryName ,a.AppName, a.Tags, a.Logo as AppLogoName FROM Apps a INNER JOIN Categories c on a.CategoryId = c.Id ';
    this.baseWhere = ' WHERE a.IsApproved = 1 AND c.IsActive = 1 ';
    this.baseOrderBy = ' ORDER BY c.Ordinal, a.AppName';
}

SearchApi.prototype = {

    GetAllApprovedApps: function (req, res, seq) {
        var query = this.baseQuery + this.baseWhere + this.baseOrderBy + ';';
        
        seq.query(query,
            { type: seq.QueryTypes.SELECT })
            .then(function (apps) {
                res.json(apps);
            });
    },

    SearchBy: function (req, res, seq, searchString) {
        var src = searchString + '%';
        var newWhere = this.baseWhere + ' AND a.AppName LIKE :src ';
        var query = this.baseQuery + newWhere + this.baseOrderBy + ';';
        
        seq.query(query,
            {
                replacements: { src: src },
                type: seq.QueryTypes.SELECT
            })
            .then(function (apps) {

                res.json(apps);

            });

    }


}
module.exports = SearchApi;