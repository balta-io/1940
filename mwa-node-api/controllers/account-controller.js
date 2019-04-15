var md5 = require('MD5');
var User = require('../models/user').User;
var auth = require('../security/auth');

exports.authenticate = function(req, res) {
    User.findOne({
        username: req.body.username,
        password: md5(req.body.password + global.SALT_KEY)
    }, function(error, user) {
        if (error)
            res.send(error);

        if (!user)
            res.json({
                success: false,
                message: 'Usuário ou senha inválidos'
            });
        else {
            var token = auth.signIn(user);

            res.json({
                success: true,
                message: 'Seu token expira em 24 horas!',
                token: token,
                user: {
                    id: user._id,
                    username: user.username,
                    admin: user.admin
                }
            });
        }
    });
}

exports.info = function(req, res) {
    auth.info(req, res);
};
