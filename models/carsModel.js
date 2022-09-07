const mongoose = require('mongoose');
const Schema = mongoose.Schema;

CarsSchema = new Schema({
    name: {type: String}
});
module.exports = mongoose.model('Cars', CarsSchema);