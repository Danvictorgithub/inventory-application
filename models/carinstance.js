const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarInstanceSchema = new Schema({
	car:{type:Schema.Types.ObjectId, ref:"Car",required:true},
	status: {type:String, required:true,enum:["Available","Out of Stock","Available-SecondHand"],default:"Out of Stock"},
});
CarInstanceSchema.virtual("url").get(function(){
	return `/catalogue/database/carinstance/${this._id}`;
});

module.exports = mongoose.model("CarInstance", CarInstanceSchema);