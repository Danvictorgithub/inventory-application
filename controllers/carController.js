const Car = require                     ("../models/car");
const CarType = require                 ("../models/cartype");
const Brand = require                   ("../models/brand");
const CarInstance = require             ("../models/carinstance");
const {body, validationResult} = require("express-validator"); //For sanitizing forms
const async = require                   ("async");
const multer = require                  ('multer');

// File Upload API configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/carImages');
  },
  filename: function (req, file, cb) {
  	const fileExtention = file.originalname.split('.')[1];
    const fileName = `${Math.round(Math.random() * 1E9)}.${fileExtention}`; //Randomize filename to avoid same-name errors
	cb(null,fileName);
  }
});
// Filters to Image Only
const upload = multer({storage:storage,fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }, limits: { fileSize: 2000000 }}); // limit imgage upload to 2MB

exports.car_create_get = (req,res,next) => {
	async.parallel(
		{
			brands(callback) {
				Brand.find(callback);
			},
			car_types(callback) {
				CarType.find(callback);
			}
		},
		(err,results)=>{
			if (err) {
				return next(err);
			}
			res.render("car_form", {brands:results.brands, car_types:results.car_types});
		});
};
// Car Form Sanitazion
exports.car_create_post = [
	upload.single('img'),
	body("name","Name is required").trim().isLength({min:1}).escape(),
	body("brand","Brand is required").trim().isLength({min:1}).escape(),
	body("car_type","Car Type is required").trim().isLength({min:1}).escape(),
	body("description","Description is Invalid").optional({ checkFalsy: true }).trim().escape(),
	(req,res, next) => {
		// console.log(req.body,req.file);
		const errors = validationResult(req);
		const car = new Car({
			name:req.body.name,
			brand:req.body.brand,
			car_type: req.body.car_type,
			description: req.body.description,
			img:req.file.filename
		});
		if (!errors.isEmpty()) {
			async.parallel(
			{
				brands(callback) {
					Brand.find(callback);
				},
				car_types(callback) {
					CarType.find(callback);
				}
			},
			(err,results)=>{
				if (err) {
					return next(err);
				}
				res.render("car_form", {brands:results.brands, car_types:results.car_types});
			});
			return;
		}
		car.save((err)=> {
			if (err) {
				return next(err);
			}
			res.redirect(car.url);
		});
		// console.log("Success");
	}
];

// Catalogue Filters
exports.car_catalog_info = (req,res,next) => {
	async.parallel(
		{
			cars(callback) {
				Car.find().populate("brand").populate("car_type").exec(callback);
			},
		},
		(err,results)=>{
			if (err) {
				return next(err);
			}
			res.render("catalogueshop",{searchQuery:"All",cars:results.cars});
		});
};
exports.car_catalog_info_sort_by_brand = (req,res,next) => {
	async.parallel(
		{
			cars(callback) {
				Car.find().populate("brand").populate("car_type").sort("brand").exec(callback);
			},
		},
		(err,results)=>{
			if (err) {
				return next(err);
			}
			res.render("catalogueshop",{searchQuery:"Car",cars:results.cars});
		});
};
exports.car_catalog_info_sort_by_car_type = (req,res,next) => {
	async.parallel(
		{
			cars(callback) {
				Car.find().populate("brand").populate("car_type").sort("car_type").exec(callback);
			},
		},
		(err,results)=>{
			if (err) {
				return next(err);
			}
			res.render("catalogueshop",{searchQuery:"Car Type",cars:results.cars});
		});
};
exports.car_catalog_info_sort_by_car = (req,res,next) => {
	async.parallel(
		{
			cars(callback) {
				Car.find().populate("brand").populate("car_type").sort("name").exec(callback);
			},
		},
		(err,results)=>{
			if (err) {
				return next(err);
			}
			res.render("catalogueshop",{searchQuery:"Car",cars:results.cars});
		});
};
// Car Details Controllers
exports.car_catalog_details = (req, res, next) => {
	async.parallel(
		{
			car(callback) {
				Car.findById(req.params.id).populate("brand").populate("car_type").exec(callback);
			},
			carinstance(callback) {
				CarInstance.findOne({car:req.params.id}).exec(callback);
			}
		},
		(err,results) => {
			if (err) {
			return next(err);
			}
			if (results.car === null) {
				const err = new Error("Car Not Found");
				err.status = 404;
				return next(err);
			}
			console.log(results.carinstance)
			res.render("car_details",{car:results.car, carinstance:results.carinstance});
		});
};