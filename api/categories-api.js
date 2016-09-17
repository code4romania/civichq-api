function CategoriesApi() { }

CategoriesApi.prototype =
    {
        GetCategories: function (req, res, seq) {

            seq.query("SELECT Id, CatName, Ordinal FROM Categories WHERE IsActive = 1",
                { type: seq.QueryTypes.SELECT })
                .then(function (categories) {

                    res.json(categories);

                });
        }
    }
module.exports = CategoriesApi;