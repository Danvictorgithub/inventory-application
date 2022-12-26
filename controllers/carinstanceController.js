const CarInstance = require            ("../models/carinstance");
const Car = require                    ("../models/car");
const {body,validationResult} = require("express-validator");
exports.car_instance_form_create_get = (req,res,next) => {
	Car.find().populate("brand").exec((err,cars) => {
		if (err) {
			return next(err);
		}
		res.render("car_instance_form", {cars:cars});
	});
};
exports.car_instance_form_create_post = [
	body("car").trim().isLength({min:1}).escape(),
	body("status").trim().isLength({min:1}).escape(),
	(req,res,next) => {
		console.log(req.body);
		const errors = validationResult(req);
		const carinstance = new CarInstance({car:req.body.car,status:req.body.status});
		if (!errors.isEmpty()) {
			Car.find().populate("brand").exec((err, cars) => {
				if (err) {
					return next(err);
				}
				res.render("car_instance_form", {cars:cars, errors:errors.array()});
			});
			return;
		}
		carinstance.save((err,thecarinstance) => {
			if (err) {
				return next(err);
			}
			res.redirect(thecarinstance.url);
		});
	}
];
exports.car_instance_details = (req,res,next) => {
	res.send("Not Yet Implemented");
};