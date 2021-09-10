const User = require('../models/user.model')
const Category = require('../models/category.model')
const Bookmark = require("../models/bookmark.model");

module.exports.saveCategory = async (req, res) => {
    const { created, category, userBy } = req.body;
    const user = await User.findOne({ _id: userBy })
    if (!user) {
        return res.status(401).json({ message: "User Not Found!!" })
    }
    try {
        const categoryName = await new Category({ created, category, userBy }).save()
        res.json({ category: categoryName })
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'error in save category' });
    }
}
//test:success
module.exports.updateCategory = async (req, res) => {
    const { id } = req.params
    const { _id } = req.user
    const { category, lastUpdate } = req.body;
    const user = await User.findOne({ _id })
    if (!user) {
        return res.status(401).json({ message: "User Not Found!!" })
    }
    const findCategory = await Category.findOne({ _id: id })
    if (!findCategory) {
        return res.status(401).json({ message: "category Not Found!!" })
    }
    try {
        //1. update category in category collection 
        const filterCategory = {  userBy: _id, _id: id };
        const updateCategory = { category,lastUpdate };
        const categoryUpdate = await Category.findOneAndUpdate(filterCategory,updateCategory,{new:true})
        console.log("category Update", categoryUpdate)
        //2. update category in bookmark collection 
        const BookmarkUpdate = await Bookmark.updateMany({ userBy: _id, categoryId: id }, { $set: {category } })
        console.log("bookmark Update", BookmarkUpdate)

        res.json({ categoryUpdate: categoryUpdate})
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'error in update category' });
    }

}
//test:success
module.exports.deleteCategory = async (req, res) => {
    const { id } = req.params
    const { _id } = req.user
    const user = await User.findOne({ _id })
    if (!user) {
        return res.status(401).json({ message: "User Not Found!!" })
    }
    const findCategory = await Category.findOne({ _id: id })
    if (!findCategory) {
        return res.status(401).json({ message: "category Not Found!!" })
    }
    try {
        const categoryName = await Category.remove({ userBy: _id, _id: id })
        res.json({ category: categoryName })
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'error in delete category' });
    }

}
//test:success
module.exports.getAllCategory = async (req, res) => {
    const { _id } = req.user

    try {
        const categories = await Category.find({ userBy: _id }).select('category');
        res.json({ categories: categories })

    } catch (e) {
        res.status(401).json({ message: "Error in Fetch Categories" })
    }
}

//test:pending
module.exports.getCategory = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user
    const user = await User.findOne({ _id })
    if (!user) {
        return res.status(401).json({ message: "User Not Found!!" })
    }
    try {
        const category = await Category.findById({ _id: id });
        res.json({ category: category })

    } catch (e) {
        res.status(401).json({ message: "Error in get Category" })
    }
}