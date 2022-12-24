const express = require('express');
const router = express.Router();
const async = require('async');
const Brand = require("../models/brand");
const Car = require("../models/car");
const CarType = require("../models/cartype");

router.get('/', (req, res, next) => {
    res.render("cataloguehome");
});
router.get('/shop', (req,res,next) => {
	res.render("catalogueshop");
});

module.exports = router;