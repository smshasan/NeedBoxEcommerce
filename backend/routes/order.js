const express = require('express');
const router = express.Router();


const {
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder,
    createProductReview,
    getProductReviews,
    deleteReview

} = require('../controllers/orderController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders/').get(isAuthenticatedUser, authorizeRoles('admin', 'vendor'), allOrders);
router.route('/admin/order/:id')
            .put(isAuthenticatedUser, authorizeRoles('admin', 'vendor'), updateOrder)
             .delete(isAuthenticatedUser, authorizeRoles('admin', 'vendor'), deleteOrder);


router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)



module.exports = router;