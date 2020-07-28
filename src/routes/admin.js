const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { auth } = require('../utils/middleware');
const { signIn } = require('../controllers/admin.controller');
const { create } = require('../models/user.model');

router.route('/').get(auth, adminController.list);
router.route('/').put(auth, adminController.update);
router.route('/get').get(auth, adminController.show);
router.route('/').delete(auth, adminController.destroy);

router.route('/signin').post(adminController.signIn);
router.route('/signup').post(adminController.create);

module.exports = router;