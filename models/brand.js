const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: {type: String, required:true, minLength:1, maxLength:100}
});
module.exports = mongoose.model('Brand',BrandSchema);