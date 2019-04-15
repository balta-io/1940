var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        get: getPrice,
        set: setPrice
    },
    quantityOnHand: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String
    }
});

function getPrice(num) {
    return (num / 100).toFixed(2);
}

function setPrice(num) {
    return num * 100;
}

var product = mongoose.model('product', productSchema);

module.exports = {
    Product: product
};
