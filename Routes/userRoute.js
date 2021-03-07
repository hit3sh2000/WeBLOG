const express = require('express');
var router = express.Router();
const userController = require('../Controllers/userController')
const { verifyAccessToken } = require('../Middlewares/jwt_helper')

router.route('/')
    .post(userController.addUser)
    .get(userController.getUser)

router.route('/getPosts')
    // .get(userController.getPosts)
    .get(verifyAccessToken, userController.getPosts)

router.route('/login')
    .post(userController.Login)
module.exports = router;