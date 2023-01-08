const express = require('express');
const router = express.Router();

const {
    registerDeliveryMan,
    loginDeliveryMan,
    allDeliveryMen
} = require('../controllers/driverController');


router.route('/register/deliveryMan').post(registerDeliveryMan);
router.route('/login/deliveryMan').get(loginDeliveryMan);

router.route('/admin/deliveryMen').get(allDeliveryMen);

module.exports = router;