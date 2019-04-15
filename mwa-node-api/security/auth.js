var jwt = require('jsonwebtoken');

exports.signIn = function(user) {
    return jwt.sign(user, global.SALT_KEY, {
        expiresInMinutes: 1440 // expires in 24 hours
    });
};

exports.authorize = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Token inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(err, decoded) {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        });
    }
};

exports.info = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    jwt.verify(token, global.SALT_KEY, function(err, decoded) {
        if (err) {
            res.status(401).json({
                success: false,
                message: 'Token inválido'
            });
        } else {
            res.status(200).json(decoded);
        }
    });
}
