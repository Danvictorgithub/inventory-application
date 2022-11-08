var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
const carsController = require('../controllers/carsController');


/* GET home page. */
router.get('/', indexController.car_info_list);

router.get('/cars/:carid', carsController.get_car_info);
module.exports = router;
