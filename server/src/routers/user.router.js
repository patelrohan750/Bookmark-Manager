const express=require('express');
const router=express.Router();
const controller=require('../contorollers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/api/user/register',controller.createuser)
router.get('/api/user/register/verify/:verificationcode',controller.verifyuser)
router.post('/api/user/login',controller.loginuser)
router.get('/api/refresh',controller.refresh)
router.post('/api/user/logout',authMiddleware,controller.logoutuser)






module.exports=router