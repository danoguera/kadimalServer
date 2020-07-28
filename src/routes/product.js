const router = require('express').Router();
const productController = require('../controllers/product.controller');
const { auth, verify, savePhoto } = require('../utils/middleware');
const { formData } = require('../utils/cloudinary');

router.route('/').get(auth, productController.list);
router.route('/').post(auth, formData, productController.create);
router.route('/:productId').put(verify, productController.update);
router.route('/:productId').get(productController.show);
router.route('/:productId').delete(verify, productController.destroy);
router.route('/subcategory/:subcategoryName').get(auth, productController.showAll);
router.route('/category/:categoryName').get(auth, productController.showAllCategory);

module.exports = router;