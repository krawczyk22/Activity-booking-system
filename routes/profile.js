
var express = require('express');
var router = express.Router();
var mime = require('mime-types')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype)); //mime type allows the extensions of files
    }
  });
   
  var upload = multer({ storage: storage }).single('profileImage');
   
  router.post('/', function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
      }
      res.json({
          success: true,
          message: 'Image uploaded successfully'
      });
      // Everything went fine.
    })
  });

  module.exports = router;