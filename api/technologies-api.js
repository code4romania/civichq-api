function TechnologiesApi() {

}

TechnologiesApi.prototype = {

    GetTechnologies: function (req, res, seq) {
        seq.query('SELECT TechName from Technologies ORDER BY TechName',
            { type: seq.QueryTypes.SELECT })
            .then(function(technologies){
                res.json(technologies.map(function(technology){return technology.TechName;}))
            })
            .catch(function(err){
                console.error(err);
                res.json(err);
            });
    }
}

module.exports = TechnologiesApi;
