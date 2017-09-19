var express = require('express');
var router = express.Router();

var flickrService = require('../services/flickrService');
var photosArray = [];

router.get('/photos', function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
    console.log("Got a client request from " + ip);
    //var photos = flickrService.recentPhotos;
    flickrService.getPhotosByPageNum(1, function(photos){
        photosArray = photos;
        console.log('/photos api returned: ' + photosArray.length);
        res.json(photosArray);
    });
});

router.get('/morePhotos', function(req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress;
    var pageNum = parseInt(req.query.pageNum);
    console.log("Got a client request from " + ip);
    flickrService.getPhotosByPageNum(pageNum, function(photos){
        photosArray = photos;
        console.log('/morePhotos api returned: ' + photosArray.length);
        res.json(photosArray);
    });
});

module.exports = router;