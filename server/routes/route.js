const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.post('/products', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.productcreate);

router.get('/products', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.productlists);

router.get('/products/:productId', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.productlist);

router.put('/products/:productId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.productlistUpdate);

router.delete('/products/:productId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.productlistDelete);

module.exports = router;

//
