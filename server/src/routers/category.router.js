const express=require('express');
const router=express.Router();
const controller=require('../contorollers/category.controller')
const authMiddleware=require('../middleware/auth.middleware')
router.post('/api/category',authMiddleware,controller.saveCategory)
router.get('/api/categories',authMiddleware,controller.getAllCategory)
router.get('/api/category/:id',authMiddleware,controller.getCategory)
router.put('/api/category/:id',authMiddleware,controller.updateCategory)
router.delete('/api/category/:id',authMiddleware,controller.deleteCategory)



module.exports=router