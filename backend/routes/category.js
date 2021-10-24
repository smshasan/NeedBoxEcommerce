const express = require('express');
const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controllers/category');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), 'uploads'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + '-' + file.originalname);
//   },
// });

//  const upload = multer({ storage });

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/category/create').post(isAuthenticatedUser, authorizeRoles('admin'), /*upload.single("categoryImage"),*/ addCategory)
router.route('/category/getCategory').get(getCategories)
// router.route('/category/getCategory').get(isAuthenticatedUser, authorizeRoles('admin', 'vendor'), getCategories)
router.route('/category/update').put(isAuthenticatedUser, authorizeRoles('admin'), /*upload.array("categoryImage"),*/ updateCategories)
router.route('/category/delete').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategories)

module.exports = router;
