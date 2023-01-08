const express = require('express')
const router = express.Router();

console.log('express', router);

const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getProductsBySlug,
    getDiscountBySlug
    
    

} = require('../controllers/productController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


//router.get("/products/:slug", getProductsBySlug);
router.route('/products/:slug').get(getProductsBySlug);
router.route('/discount/:slug').post(getDiscountBySlug);

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles( 'admin', 'vendor'), newProduct);

router.route('/admin/product/:id')
    .put( isAuthenticatedUser, authorizeRoles('admin', 'vendor'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin', 'vendor'), deleteProduct);


module.exports = router;