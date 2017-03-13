var multer = require('multer');

var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var appConfig = require('config');


function UploadApi() {
    this.logoFolder = 'assets/images';
}

function UploadFiles(req, res, path, noOfFiles){
        
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path)
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        });

        var upload = multer({storage: storage}).array("uploads[]", noOfFiles);
        upload(req, res, function (err) {
            //console.log(req.files);
            if (err) {
                res.json(err);
                return;
            }

            res.end('200');
        });

    }

    function UploadFilesToS3(req, res, noOfFiles){
        aws.config.update({
            accessKeyId : appConfig.get("S3.access-key"),
            secretAccessKey: appConfig.get("S3.secret-key"),
            "region" : "eu-central-1"
        });
        var s3 = new aws.S3({
            signatureVersion: 'v4'}); 

        var upload = multer({
            storage: multerS3({
                s3:s3,
                bucket : 'civichq',
                metadata: function (req, file, cb) {
                    cb(null, {fieldName: file.fieldname});
                },
                key: function (req, file, cb) {
                    cb(null, appConfig.get("S3.bucket-app-folder") + file.originalname)
                },
                acl: 'public-read'
            })
        }).array("uploads[]", 1)(req, res, function(err){
            if(err){
                res.json(err);
                return;
            }
            console.log("Success S3 upload of file!")
            res.end('200');
        });

    }

UploadApi.prototype = {


    UploadLogo: function (req, res) {

        //return UploadFiles(req, res, './api', 1); //use this for test
        return UploadFilesToS3(req, res, 1);

    }

}

module.exports = UploadApi;