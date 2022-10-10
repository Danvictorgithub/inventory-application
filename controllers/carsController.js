const async = require('async');

const Cars = require('../models/cars');
exports.get_car_info = (req,res,next) => {
    async.parallel({
        carsInfo(callback) {
            Cars.findById(req.params.carid).exec(callback);
        }
    },(err, results) =>{
        console.log(results.carsInfo);
        if (err) {
            if (results.carsInfo == null) {
                // No results.
                const err = new Error("Car not found");
                err.status = 404;
                err.stack = "ID doesn't exist in the Database";
                return next(err);
            }
            return next(err);
        }
        res.end("Hey it exist");
    })
}