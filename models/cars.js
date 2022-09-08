const mongoose = require('mongoose');
const Schema = mongoose.Schema;

CarsSchema = new Schema({
    name: {type: String},
    brand: {type:Schema.Types.ObjectId, ref:'Brands', required:true},
    car_type:{type:Schema.Types.ObjectId, ref:'Cartypes', required:true},
    description: {type: String},
    image: {type: String},
});

module.exports = mongoose.model('Cars', CarsSchema);