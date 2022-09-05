const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('carscatalogue', {title: "Cars Catalogue"});
});

module.exports = router;