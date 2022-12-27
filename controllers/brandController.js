const Brand = require("../models/brand");
const Car = require("../models/car");
const {body, validationResult} = require("express-validator");
const async = require("async");
exports.brand_list = (req,res,next) => {
	Brand.find().exec((err,brands)=>{
		if (err) {
			return next(err);
		}
		res.render("brand_list",{brands:brands});
	});
};
exports.brand_details = (req,res,next) => {
	Brand.findById(req.params.id).exec((err,brand) =>{
		if (err) {
			return next(err);
		}
		if (brand == null) {
			const err = new Error(`Brand ID: ${req.params.id} not found`);
			return next(err);
		}
		res.render("brand_details",{brand:brand});
	});
};
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
			//Checks if the brand name already exist otherwise create one
			if (brands.map(brandObject => brandObject.name.toLowerCase()).includes(req.body.name.toLowerCase()) == true) {
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
exports.brand_delete_get = (req,res,next) => {
	async.parallel(
		{
			brand(callback) {
				Brand.findById(req.params.id).exec(callback);
			},
			cars(callback) {
				Car.find({brand:req.params.id}).exec(callback);
			}
		},
		(err,results)=> {
			if (err) {
				return next(err);
			}
			if (results.brand == null) {
				const err = new Error(`Brand ID: ${req.params.id} not found`);
				return next(err);
			}
			res.render("brand_delete", {brand:results.brand,cars:results.cars});
		});
	// Refactored series delete get
	// Brand.find(req.params.id).exec((err, brand) => {
	// 	if (err) {
	// 		return next(err);
	// 	}
	// 	if (brand == null) {
	// 		if (brand == null) {
	// 		const err = new Error(`Brand ID: ${req.params.id} not found`);
	// 		return next(err);
	// 		}
	// 	}
	// 	Car.find({brand:req.params.id}).exec((err, cars) => {
	// 		if (err) {
	// 			return next(err);
	// 		}
	// 		res.render("brand_delete", {brand:brand,cars:cars});
	// 	});
		
	// });
};
exports.brand_delete_post = (req,res,next) => {
	async.parallel(
		{	
			brand(callback) {
				Brand.findById(req.body.brandid).exec(callback);
			},
			cars(callback) {
				Car.find({brand:req.body.brandid}).exec(callback);
			}
		},
		(err,results) =>{
			if (err) {
				return next(err);
			}
			if (results.brand == null) {
				const err = new Error(`Brand ID: ${req.params.id} not found`);
				return next(err);
			}
			if (results.cars.length > 0) {
				res.render("book_delete",{brand:results.brand,cars:results.cars});
				return;
			}
			Brand.findByIdAndDelete(req.body.brandid,(err)=> {
				if (err) {
					return next(err);
				}
				res.redirect("/catalogue/database/brands");
			});
		});
};
exports.brand_update_get = (req,res,next) => {
	Brand.findById(req.params.id).exec((err,brand) =>{
		if (err) {
			return next(err);
		}
		if (brand == null) {
			const err = new Error(`Brand ID: ${req.params.id} not found`);
			return next(err);
		}
		res.render("brand_form",{brand:brand});
	});
};
exports.brand_update_post = [
	body("name").trim().isLength({min:1}).escape(),
	(req,res,next) => {
		const errors = validationResult(req);
		const brand = new Brand({name:req.body.name,_id:req.params.id});
		if (!errors.isEmpty()) {
			res.render("brand_form", {errors:errors.array()});
			return;
		}
		Brand.findOne({name:req.body.name}).exec((err, found_brand)=> {
			if (err) {
				return next(err);
			}
			if (found_brand) {
				Brand.findById(req.params.id).exec((err,brand) =>{
					if (err) {
						return next(err);
					}
					const NewError = [{msg:"This Brand Name Already Exist in the DataBase"}];
					res.render("brand_form", {brand, errors:NewError});
				});
				return;
			} else {
				Brand.findByIdAndUpdate(req.params.id,brand,{},(err,thebrand)=> {
					if (err) {
						return next(err);
					}
					res.redirect(thebrand.url);
				});
			}
		});
		// Very Inefficient Refactored ^
		// Brand.find().exec((err,brands) => {
		// 	if (err) {
		// 		return next(err);
		// 	}
		// 	//Checks if the brand name already exist otherwise create one
		// 	// if (brands.map(brandObject => brandObject.name.toLowerCase()).includes(req.body.name.toLowerCase()) == true) {
		// 	// 	const NewError = [{msg:"This Brand Already Exist in the DataBase"}];
		// 	// 	res.render("brand_form", {errors:NewError});
		// 	// 	return;
		// 	// } 

		// 	Brand.findByIdAndUpdate(req.params.id,brand,{},(err,thebrand)=> {
		// 		if (err) {
		// 			return next(err);
		// 		}
		// 		res.redirect(thebrand.url);
		// 	});
		// });		
	}
];