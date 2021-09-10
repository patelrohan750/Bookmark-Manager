const express=require('express');
const router=express.Router();
const controller=require('../contorollers/bookmark.controller')
const authMiddleware=require('../middleware/auth.middleware')

router.post('/api/bookmark',authMiddleware,controller.saveBookmark)
// router.put('/api/bookmark/category/:id',authMiddleware,controller.updateBookmarkByCategory)
router.get('/api/bookmarks/category/:id',authMiddleware,controller.getBookmarksByCategory)
router.get('/api/bookmarks',authMiddleware,controller.getBookmarks)
router.get('/api/bookmark/:id',authMiddleware,controller.getBookmark)
router.put('/api/bookmark/:id',authMiddleware,controller.updateBookmark)
router.delete('/api/bookmark/:id',authMiddleware,controller.deleteBookmark)
router.delete('/api/category/bookmarks/:id',authMiddleware,controller.deleteBookmarkByCategory)
router.post('/api/search',authMiddleware,controller.searchBookmarks)
router.post('/api/bookmark/count',authMiddleware,controller.getCountBookmarkByCategory)







module.exports=router