const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: {type: String,required:true,minLength:1, maxLength:100},
    brand: {type:Schema.Types.ObjectId, ref:'Brand', required:true},
    car_type:{type:String,required:true},
    description: {type: String},
    img: {
        data:Buffer,
        contentType:String
    }
});

module.exports = mongoose.model('Car', CarSchema);