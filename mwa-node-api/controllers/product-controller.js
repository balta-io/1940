var Product = require('../models/product').Product;

exports.list = function(req, res) {
    Product.find({}, function(error, products) {
        if (error)
            res.send(error);

        res.json(200, products);
    });
};

exports.create = function(req, res) {
    var product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.quantityOnHand = req.body.quantityOnHand;
    product.image = req.body.image;

    product.save(function(error) {
        if (error)
            res.send(error);

        res.json(201, product);
    });
};

exports.show = function(req, res) {
    var id = req.params.id; // The id of the workout the user wants to look up.
    Product.findOne({
            _id: id
        },
        function(err, doc) {
            if (!err && doc) {
                res.status(200).json(doc);
            } else if (err) {
                res.json(500, {
                    message: "Falha ao localizar registro"
                });
            } else {
                res.json(404, {
                    message: "Registro não encontrada"
                });
            }
        });
};
