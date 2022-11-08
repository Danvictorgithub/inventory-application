// Index Controllers holds All Types, allowing fetching bulk data from each types.
const async = require('async');

const Brand = require('../models/brands');
const Cars = require('../models/cars');
const Cartypes = require('../models/cartypes');

exports.car_info_list = (req,res, next) => {
    // Returns the Number of Each Types
    async.parallel({
        brandsCount(callback){
            Brand.countDocuments({}).exec(callback);
        },
        carsCount(callback) {
            Cars.countDocuments({}).exec(callback);
        },
        cartypesCount(callback) {
            Cartypes.countDocuments({}).exec(callback);
        }
    }, (err, results) => {
        if (err) {
            return next(err);
        }
        res.render('index', {
            title: 'Modern Car Shop',
            brandsCount: results.brandsCount,
            carsCount: results.carsCount,
            cartypesCount: results.cartypesCount
        });
    })
}
