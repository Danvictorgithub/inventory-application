const express = require('express');
const router = express.Router();
const carController = require("../controllers/carController");
// Home Routes
router.get('/', (req, res, next) => {
    res.render("cataloguehome");
});
// Brands Route
router.get('/shop', carController.car_catalog_info);
router.get('/shop/brands', carController.car_catalog_info_sort_by_brand);
// Cars Route
router.get('/shop/cars', carController.car_catalog_info_sort_by_car);
router.get('/shop/car/create',carController.car_create_get);
router.post('/shop/car/create',carController.car_create_post);
router.get('/shop/car/:id', (req,res,next) => {
	res.send(`CarID:${req.params.id} Details is not yet Implemented`);
});
router.get('/shop/car/:id/update', (req,res,next) => {
	res.send(`CarID:${req.params.id} Update is not yet Implemented`);
});
// Car Types Route
router.get('/shop/cartypes', carController.car_catalog_info_sort_by_car_type);
// Car Instance Route
module.exports = router;