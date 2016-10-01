var multer = require('multer');

function UploadApi() {
    this.logoFolder = './../assets/images';
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

UploadApi.prototype = {

    
    UploadLogo: function (req, res) {

        return UploadFiles(req, res, this.logoFolder, 1);
        
    }

}

module.exports = UploadApi;