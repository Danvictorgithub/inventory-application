const CarInstance = require            ("../models/carinstance");
const Car = require                    ("../models/car");
const {body,validationResult} = require("express-validator");
const async = require                  ("async");
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
		// console.log(req.body);
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
		CarInstance.find({car:req.body.car}).exec((err,result)=> {
			// console.log(result);
			if (err) {
				return next(err);
			}
			if (result.length > 0) {
				const NewError = [{msg:"This Car Already have a Car Instance"}];
				Car.find().populate("brand").exec((err,cars) => {
					if (err) {
						return next(err);
					}
					res.render("car_instance_form", {cars:cars,errors:NewError});
				});
				return;
			}
			carinstance.save((err,thecarinstance) => {
				if (err) {
					return next(err);
				}
				res.redirect(thecarinstance.url);
			});
		});
		
	}
];
exports.car_instance_list = (req,res,next) => {
	CarInstance.find().populate({
		path:"car",
		populate: {path:"brand"}
	}).exec((err,results) => {
		if (err) {
			return next(err);
		}
		// console.log(results);
		res.render("car_instance_list",{
			car_instances:results,
		});
	});
};
exports.car_instance_details = (req,res,next) => {
	CarInstance.findById(req.params.id).populate({path:"car",populate:{path:"brand"}}).exec((err , result) => {
		if (err) {
			return next(err);
		}
		if (result == null) {
			const err = new Error(`CarInstance ID: ${req.params.id} not found in Database`);
			return next(err);
		}
		res.render("car_instance_details",{carinstance:result});
	});
};
exports.car_instance_delete_get = (req, res,next) => {
	CarInstance.findById(req.params.id).populate({path:"car",populate:{path:"brand"}}).exec((err , result) => {
		if (err) {
			return next(err);
		}
		if (result == null) {
			const err = new Error(`CarInstance ID: ${req.params.id} not found in Database`);
			return next(err);
		}
		res.render("car_instance_delete",{carinstance:result});
	});
};
exports.car_instance_delete_post = (req, res, next) => {
	CarInstance.findByIdAndDelete(req.body.carinstanceid).exec((err)=> {
		if (err) {
			return next(err);
		}
		res.redirect("/catalogue/database/carinstances");
	});
};
exports.car_instance_update_get = (req, res, next) => {
	CarInstance.findById(req.params.id).populate({path:"car",populate:{path:"brand"}}).exec((err,result) => {
		if (err) {
			return next(err);
		}
		if (result == null) {
			const err = new Error(`CarInstance ID: ${req.params.id} not found in Database`);
			return next(err);
		}
		res.render("car_instance_form",{cars:[result.car],carinstance:result});
	});
};
exports.car_instance_update_post = [
	body("car").trim().isLength({min:1}).escape(),
	body("status").trim().isLength({min:1}).escape(),
	(req,res,next) => {
		// console.log(req.body);
		const errors = validationResult(req);
		const carinstance = new CarInstance({car:req.body.car,status:req.body.status,_id:req.params.id});
		if (!errors.isEmpty()) {
			async.parallel(
				{
					car_instance(callback) {
						CarInstance.findById(req.params.id).exec(callback);
					},
					cars(callback) {
						Car.find().populate("brand").exec(callback);
					}
				},
				(err,results)=>{
					if (err) {
						return next(err);
					}
					// if (results.car_instance == null) {
					// 	const err = new Error(`CarInstance ID: ${req.params.id} not found in Database`);
					// 	return next(err);
					// }
					results.cars.forEach(car => {
						if (car._id.toString() == results.car_instance.car._id.toString()) {
							car.selected = true;
						}
					});
					res.render("car_instance_form", {cars:results.cars, carinstance:results.car_instance});
				});
			return;
		}
		CarInstance.findByIdAndUpdate(req.params.id,carinstance,{},(err,thecarinstance)=> {
			if (err) {
				return next(err);
			}
			res.redirect(thecarinstance.url);
		});		
	}
];