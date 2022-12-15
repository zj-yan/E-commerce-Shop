import express from 'express';

import UserController from './user.controller.js';

const router = express.Router(); //get access to express router


router.route('/check/:userName/:password').get(UserController.apiCheckUser);

router.route('/userInfo/:userName').get(UserController.apiGetUserInfo);

router.route('/signup').post(UserController.apiSignup);


export default router;