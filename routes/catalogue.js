const express = require('express');
const router = express.Router();
const carController = require("../controllers/carController");

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
router.get('/shop/car/create',carController.car_create_get);
router.post('/shop/car/create',carController.car_create_post)
router.get('/shop/car/:id', (req,res,next) => {
	res.send(`CarID:${req.params.id} Details is not yet Implemented`);
});
router.get('/shop/car/:id/update', (req,res,next) => {
	res.send(`CarID:${req.params.id} Update is not yet Implemented`);
});


router.get('/shop/cartypes', (req,res,next) => {
	res.render("catalogueshop",{searchQuery:"Car Types"});
});


module.exports = router;