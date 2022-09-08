const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarTypesSchema = new Schema({
    name:{type:String}
});

module.exports = mongoose.model('Cartypes', CarTypesSchema);
