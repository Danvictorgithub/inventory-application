const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarTypeSchema = new Schema({
	name: {type:String, required:true},
});

CarTypeSchema.virtual("url").get(function(){
	return `/catalogue/shop/cartype/${this._id}`;
});
module.exports = mongoose.model("CarType",CarTypeSchema);