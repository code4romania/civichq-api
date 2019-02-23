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
var jwt = require('jsonwebtoken');
var appConfig = require('config');
var expressJWT = require('express-jwt');
var UploadApi = require('./upload-api');
var AuthApi = require('./auth-api');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = appConfig.get('port');        // set our port
var routesToAuthorize = ['/api/updateapp', '/api/appprofile', 
                        '/api/uploadlogo', '/api/addapp', 
                        '/api/masterprofile', '/api/categories',
                        '/api/approvedapps', '/api/tags', '/api/search'];
                        //'/api/categories',
var isDebug = appConfig.get('IsDebug');
var theSecret = appConfig.get('jwtSecret');
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var Sequelize = require('sequelize');
var sequelize = new Sequelize(appConfig.get('sqlLogin.database'), appConfig.get('sqlLogin.username'), appConfig.get('sqlLogin.password'), appConfig.get('sqlServer'));

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    //console.log('Something is happening.');
    //console.log('Original url: ' + req.originalUrl);


    AppendHeaders(res);
    if (req.method === "OPTIONS") {
        //console.log('OPTIONS method called');
        return res.status(200).end();
    }

    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //console.log(`IsAuthRequiredForUrl este ${IsAuthRequiredForUrl(req.originalUrl)}`)

    if (IsAuthRequiredForUrl(req.originalUrl) == true) {
        // decode token
        //console.log('Required token for ' + req.originalUrl);
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, theSecret, function (err, decoded) {

                if (err) {
                   
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
    else {
        next();
    }



});

function IsAuthRequiredForUrl(url) {
    var isAuthReq = false;

    var i = routesToAuthorize.length;
    while (i--) {
        if (url.indexOf(routesToAuthorize[i]) > -1) {
            isAuthReq = true;
        }
    }

    return isAuthReq;
}

function AppendHeaders(res) {
    res.append('Access-Control-Allow-Origin', appConfig.get('clientLocation')); // 8381
    res.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Content-type,Authorization,x-access-token');
}

router.route('/auth')
    .post(function (req, res) {

        var user = req.body.username;
        var pass = req.body.password;
        var isSentinel = req.body.issentinel;

        var expiresInStr = "24h";
        if (isSentinel != undefined) {
            expiresInStr = "15m";
        }
        //console.log(`In API auth; user: ${user} ; pass: ${pass}`);
        //console.log(req.body);
        var authapi = new AuthApi(theSecret, user, pass, sequelize, isDebug);
        authapi.Authenticate(function (result) {
            //console.log(result);
            //user === "code4" && pass === "civitas123#"
            if (result.success == true) {
                var token = jwt.sign({ payload: user }, theSecret, {
                    expiresIn: expiresInStr
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token,
                    isadmin: result.data.IsAdmin
                });
            } else {
                res.json({
                    success: false,
                    message: 'Incorrect credentials!'
                });
            }
        });


    });

router.route('/gethash')
    .post(function (req, res) {

        var pass = req.body.password;
        var sec = req.body.secret;
        var authapi = new AuthApi(sec, '', pass, sequelize);
        authapi.GenerateHashForPass(res, true);
    });

router.route('/uploadlogo')
    .post(function (req, res) {
        var uploadApi = new UploadApi();
        uploadApi.UploadLogo(req, res);
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
            appConfig.get("S3.bucket-url-root") + appConfig.get("S3.bucket-app-folder") + req.body.applogoname,
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
            req.body.active,
            appConfig.get("S3.bucket-url-root") + appConfig.get("S3.bucket-app-folder") + req.body.ngologoname
        );

        api.AddApp(res, sequelize);
    }
    );

router.route('/tags/:src')
    .get(
    function (req, res) {
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

        var appId = req.params.appid;

        //console.log('updating app id ' + appId);
        var api = new ApproveApi();

        api.UpdateApp(res, sequelize, appId);

    });

router.route('/search/:src_text')
    .get(function (req, res) {

        var src = req.params.src_text;

        var api = new SearchApi();
        api.SearchBy(req, res, sequelize, src);

    });

/*router.route('/quit')
    .get(
    function (req, res) {
        res.send("closing...");
        process.exit(0);
    }
    );*/



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
