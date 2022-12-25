const Car = require("../models/car");
const {body, validationResult} = require("express-validator"); //For sanitizing forms

const multer = require('multer'); // File Upload API configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/carImages');
  },
  filename: function (req, file, cb) {
  	const fileExtention = file.originalname.split('.')[1];
    const fileName = `${Math.round(Math.random() * 1E9)}.${fileExtention}`;
	cb(null,fileName);
  }
});
const upload = multer({storage:storage,fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }, limits: { fileSize: 2000000 }}); // limit imgage upload to 2MB
const Brand = require("../models/brand");
exports.car_create_get = (req,res,next) => {
	Brand.find().exec((err,results) => {
		if (err) {
			return next(err);
		}
		res.render("car_form", {brands:results});
		});
	};

exports.car_create_post = [
	upload.single('img'),
	body("name","Name is required").trim().isLength({min:1}).escape(),
	body("brand","Brand is required").trim().isLength({min:1}).escape(),
	body("car_type","Car Type is required").trim().isLength({min:1}).escape(),
	body("description","Description is Invalid").optional({ checkFalsy: true }).trim().escape(),
	(req,res, next) => {
		console.log(req.body,req.file);
		const errors = validationResult(req);
		const car = new Car({
			name:req.body.name,
			brand:req.body.brand,
			car_type: req.body.car_type,
			description: req.body.description,
			img:req.file.filename
		});
		if (!errors.isEmpty()) {
			Brand.find().exec((err,results) => {
				if (err) {
					return next(err);
				}
				res.render("car_form", {brands:results,errors:errors.array()});
				});
			return;
		}
		car.save((err)=> {
			if (err) {
				return next(err);
			}
			res.redirect(car.url);
		});
		console.log("Success");
	}
];