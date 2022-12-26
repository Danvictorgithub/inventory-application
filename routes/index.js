var express = require('express');
var router = express.Router();
const async = require("async");
const Brand = require("../models/brand");
const Car = require("../models/car");
const CarType = require("../models/cartype");
/* GET Main page. */
router.get('/', function(req, res, next) {
  async.parallel(
        {
            brands(callback) {
                Brand.countDocuments(callback);
            },
            cars(callback) {
                Car.countDocuments(callback);
            },
            cartypes(callback) {
                CarType.countDocuments(callback);
            }
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            console.log(results);
            res.render("index", {
                title:"Modern Car Shop",
                brandsCount:results.brands,
                carsCount:results.cars,
                cartypesCount:results.cartypes
            });
        });
});
module.exports = router;
