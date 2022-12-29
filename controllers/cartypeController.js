const CarType = require                 ("../models/cartype");
const Car = require                     ("../models/car");
const {body, validationResult} = require("express-validator");
const async = require                   ("async");

exports.car_type_create_get = (req,res,next) => {
	res.render("car_type_form");
};
exports.car_type_create_post = [
	body("name").trim().isLength({min:1}).escape(),
	(req,res,next) => {
		const errors = validationResult(req);
		const cartype = new CarType({name:req.body.name});
		if (!errors.isEmpty()) {
			res.render("car_type_form", {errors:errors.array()});
			return;
		}
		CarType.find().exec((err,cartypes) => {
			if (err) {
				return next(err);
			}
			// console.log(req.body.name);
			// console.log(cartypes.map(cartypeObject => cartypeObject.name.toLowerCase()));
			if (cartypes.map(cartypeObject => cartypeObject.name.toLowerCase()).includes(req.body.name.toLowerCase()) == true) {
				const NewError = [{msg:"This Car Type Already Exist in the DataBase"}];
				res.render("car_type_form", {errors:NewError});
				return;
			}
			// console.log("success");
			cartype.save((err,thecartype)=> {
			if (err) {
				return next(err);
			}
			res.redirect(thecartype.url);
			});
		});		
	}
];
exports.car_type_list = (req,res,next) => {
	CarType.find().exec((err,result) => {
		if (err) {
			return next(err);
		}
		res.render("car_type_list",{car_types:result});
	});
};
exports.car_type_details = (req,res,next) => {
	async.parallel({
		car_type(callback) {
			CarType.findById(req.params.id).exec(callback);
		},
		cars(callback) {
			Car.find({car_type:req.params.id}).populate("brand").exec(callback);
		}
	},(err,results)=> {
		if (err) {
			return next(err);
		}
		if (results.car_type == null) {
			const err = new Error(`Car Type ID: ${req.params.id} does not exist in the database`);
			return next(err);
		}
		res.render("car_type_details",{cars:results.cars,car_type:results.car_type});
	});
};
exports.car_type_delete_get = (req,res,next) => {
	async.parallel({
		car_type(callback) {
			CarType.findById(req.params.id).exec(callback);
		},
		cars(callback) {
			Car.find({car_type:req.params.id}).populate("brand").exec(callback);
		}
	},(err,results)=> {
		if (err) {
			return next(err);
		}
		if (results.car_type == null) {
			const err = new Error(`Car Type ID: ${req.params.id} does not exist in the database`);
			return next(err);
		}
		res.render("car_type_delete",{cars:results.cars,car_type:results.car_type});
	});
};
exports.car_type_delete_post = (req,res,next) => {
	async.parallel({
		car_type(callback) {
			CarType.findById(req.body.cartypeid).exec(callback);
		},
		cars(callback) {
			Car.find({car_type:req.body.cartypeid}).populate("brand").exec(callback);
		}
	},(err,results)=> {
		if (err) {
			return next(err);
		}
		if (results.cars > 0) {
			res.render("car_type_delete",{cars:results.cars,car_type:results.car_type});
			return;
		}
		CarType.findByIdAndDelete(req.body.cartypeid,(err) => {
			if (err) {
				return next(err);
			}
			res.redirect("/catalogue/database/cartypes");
		});
	});
};
exports.car_type_update_get = (req,res,next) => {
	CarType.findById(req.params.id).exec((err,result)=> {
		if (err) {
			return next(err);
		}
		if (result == null) {
			const err = new Error(`Car Type ID: ${req.params.id} does not exist in the database`);
			return next(err);
		}
		res.render("car_type_form",{car_type:result});
	});
};
exports.car_type_update_post = [
	body("name").trim().isLength({min:1}).escape(),
	(req,res,next) => {
		const errors = validationResult(req);
		const cartype = new CarType({name:req.body.name,_id:req.params.id});
		if (!errors.isEmpty()) {
			CarType.findById(req.params.id).exec((err, result) => {
				res.render("car_type_form", {errors:errors.array(),car_type:result});
			});
			return;
		}
		CarType.findByIdAndUpdate(req.params.id,cartype,{},(err,thecartype)=>{
			if (err){
				return next(err);
			}
			res.redirect(thecartype.url);
		});	
	}
];