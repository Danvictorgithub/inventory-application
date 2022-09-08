var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');
/* GET home page. */
router.get('/', indexController.car_info_list);
module.exports = router;
