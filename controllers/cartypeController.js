const CarType = require("../models/cartype");
const {body, validationResult} = require("express-validator");
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