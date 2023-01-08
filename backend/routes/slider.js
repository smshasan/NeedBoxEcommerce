const express = require('express');
const router = express.Router();

const {
    newSlider,
    getSlider
} = require('../controllers/sliderController');

router.route('/admin/createSlider').post(newSlider);
router.route('/admin/getSlider').get(getSlider);

module.exports = router;