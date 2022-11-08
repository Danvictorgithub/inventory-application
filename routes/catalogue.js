const express = require('express');
const router = express.Router();

const Cars = require('../models/cars');
const async = require('async');

router.get('/', (req, res, next) => {
    res.render('carscatalogue', {title: "Cars Catalogue"});
});
router.get('/', (req,res, next) => {
    async.parallel({
        cars(callback) {
            Cars.find({}).exec(callback);
        },
        carsCount(callback) {
            Cars.countDocuments({}).exec(callback);
        }
    },(err, results)=> {
        if (err) {
            return next(err);
        }
    });
})

module.exports = router;