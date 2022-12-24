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
	res.render("catalogueshop",{searchQuery:"All"});
});
router.get('/shop/brands', (req,res,next) => {
	res.render("catalogueshop",{searchQuery:"Brands"});
});

router.get('/shop/cars', (req,res,next) => {
	res.render("catalogueshop",{searchQuery:"Cars"});
});

router.get('/shop/cartypes', (req,res,next) => {
	res.render("catalogueshop",{searchQuery:"Car Types"});
});


module.exports = router;