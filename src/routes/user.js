const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { auth } = require('../utils/middleware');

router.route('/').put(auth, userController.update);
router.route('/').get(auth, userController.show);
router.route('/').delete(auth, userController.destroy);

router.route('/signin').post(userController.signIn);
router.route('/signup').post(userController.create);
router.route('/get').get(auth,userController.show);

module.exports = router;