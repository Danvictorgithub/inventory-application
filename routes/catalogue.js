const express = require('express');
const router = express.Router();
const carController = require("../controllers/carController");
const carinstanceController = require("../controllers/carinstanceController");
const brandController = require("../controllers/brandController");
// Home Routes
router.get('/', (req, res, next) => {
    res.render("cataloguehome");
});
// Brands Route
router.get('/shop', carController.car_catalog_info);
router.get('/shop/brands', carController.car_catalog_info_sort_by_brand);
router.get('/shop/brand/create',brandController.brand_create_get);
router.post('/shop/brand/create',brandController.brand_create_post);
// Cars Route
router.get('/shop/cars', carController.car_catalog_info_sort_by_car);
router.get('/shop/car/create',carController.car_create_get);
router.post('/shop/car/create',carController.car_create_post);
router.get('/shop/car/:id', carController.car_catalog_details);
router.get('/shop/car/:id/update', (req,res,next) => {
	res.send(`CarID:${req.params.id} Update is not yet Implemented`);
});
// Car Types Route
router.get('/shop/cartypes', carController.car_catalog_info_sort_by_car_type);
// Car Instance Route
router.get("/shop/carinstance/create",carinstanceController.car_instance_form_create_get);
router.post("/shop/carinstance/create",carinstanceController.car_instance_form_create_post);
router.get("/shop/carinstance/:id",carinstanceController.car_instance_details);

module.exports = router;