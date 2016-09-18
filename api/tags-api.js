function TagsApi() {

}

TagsApi.prototype = {

    SearchTags: function (res, seq, searchString) {
        var src = '%' + searchString + '%';
        var query = 'SELECT Tag from Tags where Tag LIKE :src';

        seq.query(query, {
            replacements: {src: src},
            type: seq.QueryTypes.SELECT
        }).then(function(tags){
            res.json(tags);
        });

    }
}

module.exports = TagsApi;