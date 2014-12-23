var express = require('express');
var router = express.Router();
var React = require('react');
var tabs = require('./../app/blocks/tabs/tabs.js');
var typeList = require('./../lib/constants/typelist.js');
var response = require('./../dev/response');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/ekaterinburg/short');
});

router.get('/:city/:type', function(req, res, next) {
    var type = req.params.type;
    var city = req.params.city;

    var Index = React.createFactory(require('./../views/index.jsx'));

    var found = -1;

    typeList.forEach(function (item, index) {
        if (item.name === type) found = index;
    });

    if (found !== -1) {
        var html = '<!DOCTYPE html>' +
            React.renderToString(Index({
                data: {
                    weather: {"json": "json string"},

                    uri: {
                        type: type,
                        city: city,
                        initial: req.originalURL
                    },

                    tabs: tabs(response)
                }
            }));

        res.send(html);
    } else {
        next();
    };
});

module.exports = router;
