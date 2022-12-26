const Brand = require("../models/brand");
const {body, validationResult} = require("express-validator");
exports.brand_create_get = (req,res,next) => {
	res.render("brand_form");
};
exports.brand_create_post = [
	body("name").trim().isLength({min:1}).escape(),
	(req,res,next) => {
		const errors = validationResult(req);
		const brand = new Brand({name:req.body.name});
		if (!errors.isEmpty()) {
			res.render("brand_form", {errors:errors.array()});
			return;
		}
		Brand.find().exec((err,brands) => {
			if (err) {
				return next(err);
			}
			if (brands.map(brandObject => brandObject.name.toLowerCase()).includes(req.body.name) == true) {
				const NewError = [{msg:"This Brand Already Exist in the DataBase"}];
				res.render("brand_form", {errors:NewError});
				return;
			}
			brand.save((err,thebrand)=> {
			if (err) {
				return next(err);
			}
			res.redirect(thebrand.url);
			});
		});		
	}
];