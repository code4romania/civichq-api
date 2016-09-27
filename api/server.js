// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var CategoriesApi = require('./categories-api');
var SearchApi = require('./search-api');
var AppProfileApi = require('./app-profile-api');
var ApproveApi = require('./approve-api');
var AddAppApi = require('./add-app-api');
var TagsApi = require('./tags-api');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    console.log(req);
    res.append('Access-Control-Allow-Origin', 'http://localhost:8381'); // 8381
    res.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.append("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next(); // make sure we go to the next routes and don't stop here
});


var Sequelize = require('sequelize');
var sequelize = new Sequelize('civichq', 'sa', 'code4ro123',
    {
        host: 'code4ro.cwdsz3qqh57p.us-west-2.rds.amazonaws.com',
        port: 3306,
        dialect: 'mysql'
    });

router.route('/addapp')
    .post(
    function (req, res) {
        console.log(req.body);
        var api = new AddAppApi(
            req.body.appname,
            req.body.appcategoryid,
            req.body.appwebsite,
            req.body.appfacebook,
            req.body.appgithub,
            req.body.appdescription,
            req.body.appcreationdate,
            req.body.applogoname,
            req.body.apphashtags,
            req.body.ngoname,
            req.body.ngophone,
            req.body.ngoemail,
            req.body.ngofacebook,
            req.body.ngogoogleplus,
            req.body.ngolinkedin,
            req.body.ngotwitter,
            req.body.ngoinstagram,
            req.body.ngodescription,
            req.body.ngologoname
        );

        api.AddApp(res, sequelize);
    }
    );

router.route('/tags/:src')
.get(
    function(req, res){
        var tagsApi = new TagsApi();
        var src = req.params.src;

        tagsApi.SearchTags(res, sequelize, src);
    }
);

router.route('/categories')
    .get(
    function (req, res) {

        var catApi = new CategoriesApi();
        catApi.GetCategories(req, res, sequelize);

    });

router.route('/approvedapps')
    .get(function (req, res) {

        var api = new SearchApi();
        api.GetAllApprovedApps(req, res, sequelize);

    });

router.route('/appprofile/:id')
    .get(function (req, res) {

        var api = new AppProfileApi();
        var id = req.params.id;
        api.GetAppProfile(res, sequelize, id);

    });

router.route('/masterprofile')
    .get(function (req, res) {

        var api = new AppProfileApi();
        api.GetMasterProfile(res, sequelize);

    });

router.route('/apps')
    .get(function (req, res) {
        var api = new ApproveApi();
        api.Apps(res, sequelize);
    });

router.route('/updateapp/:appid')
    .put(function (req, res) {

        var api = new ApproveApi();
        var appId = req.params.appid;
        api.UpdateApp(res, sequelize, appId);

    });

router.route('/search/:src_text')
    .get(function (req, res) {

        var src = req.params.src_text;

        var api = new SearchApi();
        api.SearchBy(req, res, sequelize, src);

    });

router.route('/quit')
    .get(
    function (req, res) {
        res.send("closing...");
        process.exit(0);
    }
    );

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);