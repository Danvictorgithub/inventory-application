const express = require('express');
const router = express.Router();
const carController = require("../controllers/carController");
const carinstanceController = require("../controllers/carinstanceController");
const cartypeController = require("../controllers/cartypeController");
const brandController = require("../controllers/brandController");
// Home Routes
router.get('/', (req, res, next) => {
    res.render("cataloguehome");
});
// Brands Route
router.get('/shop', carController.car_catalog_info);
router.get('/shop/brands', carController.car_catalog_info_sort_by_brand);
// router.get('/shop/brand/create',brandController.brand_create_get); Moved to Database
// router.post('/shop/brand/create',brandController.brand_create_post);
// Cars Route
router.get('/shop/cars', carController.car_catalog_info_sort_by_car);
// router.get('/shop/car/create',carController.car_create_get);
// router.post('/shop/car/create',carController.car_create_post);
router.get('/shop/car/:id', carController.car_catalog_details);
// router.get('/shop/car/:id/update', (req,res,next) => {
	// res.send(`CarID:${req.params.id} Update is not yet Implemented`);
// });
// Car Types Route
router.get('/shop/cartypes', carController.car_catalog_info_sort_by_car_type);
// Car Instance Route
// router.get("/shop/carinstance/create",carinstanceController.car_instance_form_create_get);
// router.post("/shop/carinstance/create",carinstanceController.car_instance_form_create_post);
// router.get("/shop/carinstance/:id",carinstanceController.car_instance_details);

//DataBase Route
router.get("/database/", (req,res,next) => {
	res.render("database");
});

router.get("/database/brands/",brandController.brand_list);
router.get('/database/brand/create',brandController.brand_create_get);
router.post('/database/brand/create',brandController.brand_create_post);
router.get("/database/brand/:id",brandController.brand_details);
router.get("/database/brand/:id/delete",brandController.brand_delete_get);
router.post("/database/brand/:id/delete",brandController.brand_delete_post);
router.get("/database/brand/:id/update",brandController.brand_update_get);
router.post("/database/brand/:id/update",brandController.brand_update_post);

router.get("/database/cars",carController.car_list);
router.get('/database/car/create',carController.car_create_get);
router.get("/database/car/:id",carController.car_details);
router.post('/database/car/create',carController.car_create_post);
router.get("/database/car/:id/delete",carController.car_delete_get);
router.post("/database/car/:id/delete",carController.car_delete_post);
router.get("/database/car/:id/update",carController.car_update_get);
router.post("/database/car/:id/update",carController.car_update_post);

router.get("/database/carinstances",carinstanceController.car_instance_list);
router.get("/database/carinstance/create",carinstanceController.car_instance_form_create_get);
router.post("/database/carinstance/create",carinstanceController.car_instance_form_create_post);
router.get("/database/carinstance/:id",carinstanceController.car_instance_details);
router.get("/database/carinstance/:id/delete",carinstanceController.car_instance_delete_get);
router.post("/database/carinstance/:id/delete",carinstanceController.car_instance_delete_post);
router.get("/database/carinstance/:id/update",carinstanceController.car_instance_update_get);
router.post("/database/carinstance/:id/update",carinstanceController.car_instance_update_post);

router.get("/database/cartypes",cartypeController.car_type_list);
router.get('/database/cartype/create',cartypeController.car_type_create_get);
router.post('/database/cartype/create',cartypeController.car_type_create_post);
router.get("/database/cartype/:id",cartypeController.car_type_details);
router.get("/database/cartype/:id/delete",cartypeController.car_type_delete_get);
router.post("/database/cartype/:id/delete",cartypeController.car_type_delete_post);
router.get("/database/cartype/:id/update",cartypeController.car_type_update_get);
router.post("/database/cartype/:id/update",cartypeController.car_type_update_post);
module.exports = router;