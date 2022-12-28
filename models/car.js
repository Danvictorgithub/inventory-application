const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: {type: String,required:true,minLength:1, maxLength:25},
    brand: {type:Schema.Types.ObjectId, ref:'Brand', required:true},
    car_type:{type:Schema.Types.ObjectId, ref:'CarType', required:true},
    description: {type: String, maxLength:175},
    img: {type:String}
});
CarSchema.virtual("url").get(function() {
    return `/catalogue/shop/car/${this._id}`;
});
CarSchema.virtual("imgurl").get(function() {
    return `/images/carImages/${this.img}`;
});
CarSchema.virtual("dburl").get(function() {
    return `/catalogue/database/car/${this._id}`;
});
module.exports = mongoose.model('Car', CarSchema);