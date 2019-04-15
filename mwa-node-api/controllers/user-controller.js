var md5 = require('MD5');
var User = require('../models/user').User;

exports.create = function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = md5(req.body.password + global.SALT_KEY);
    user.admin = req.body.admin;

    user.save(function(error) {
        if (error)
            res.send(error);

        res.json(201, user);
    });
}
