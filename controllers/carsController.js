const async = require('async');

const Cars = require('../models/cars');
exports.get_car_info = (req,res,next) => {
    async.parallel({
        carsInfo(callback) {
            Cars.findById(req.params.carid).exec(callback);
        }

    },(err, results)=>{
        if (err) {
            return next(err);
          }
        if (results.carsInfo.length == 0) {
            const err = new Error("Car not found");
            err.status = 404;
            return next(err);
        }
        res.end("Hey it exist");
    })
}