const Bookmark = require("../models/bookmark.model");
const { fetchDataFromURL } = require("../services/url-preview");
const User = require("../models/user.model");
const Category = require("../models/category.model");

module.exports.saveBookmark = async (req, res) => {
  const { url, category, categoryId, userBy, created } = req.body;
  console.log(url);

  //check if user exists
  const user = await User.findOne({ _id: userBy });
  if (!user) {
    return res.status(401).json({ message: "User Not Found!!" });
  }

  try {
    const { title, hostname, imageURL, description } = await fetchDataFromURL(
      url
    );
    const bookmark = await new Bookmark({
      url,
      title,
      hostname,
      description,
      imageURL,
      category,
      userBy,
      categoryId,
      created,
    });
    bookmark.save();
    console.log("Bookmark saved in db");
    res.json({ successfull: true, bookmark: bookmark });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error in save bookmark" });
  }
};

//test:success
module.exports.getBookmarks = async (req, res) => {
  const { _id } = req.user;
  try {
    const bookmarks = await Bookmark.find({ userBy: _id });
    console.log("request user: ", req.user);
    // console.log(bookmarks);
    res.json({ bookmarks: bookmarks });
  } catch (e) {
    res.status(401).json({ message: "Error in Fetch Bookmarks" });
  }
};



//test:success
module.exports.searchBookmarks = async (req, res) => {
  const { _id } = req.user;
  const { searchField, categoryId } = req.body;
  console.log(req.body);
  const qurey = {
    userBy: _id,
    $or: [
      { category: { $regex: searchField, $options: "$i" } },
      { title: { $regex: searchField, $options: "$i" } },
    ],
  };

  try {
    if (categoryId) {
      const searchResult = await Bookmark.find({
        userBy: _id,
        categoryId,

        title: { $regex: searchField, $options: "$i" },
      });
      res.json({ serchResult: searchResult });
    } else {
      const searchResult = await Bookmark.find(qurey);
      res.json({ serchResult: searchResult });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Error in search bookmarks" });
  }
};


//test:success
// module.exports.updateBookmarkByCategory = async (req, res) => {
//   const { category } = req.body;
//   const { id } = req.params;
//   const { _id } = req.user;
//   const user = await User.findOne({ _id });
//   if (!user) {
//     return res.status(401).json({ message: "User Not Found!!" });
//   }
//   try {
//     const bookmark = await Bookmark.updateMany(
//       {
//         userBy: _id,
//         categoryId: id,
//       },
//       { $set: { category } }
//     );
//     res.json({ bookmark: bookmark });
//   } catch (e) {
//     console.log(e);
//     return res
//       .status(400)
//       .json({ message: "error in udating category in bookmark" });
//   }
// };

//test:success
module.exports.getBookmarksByCategory = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const user = await User.findOne({ _id });
  if (!user) {
    return res.status(401).json({ message: "User Not Found!!" });
  }
  try {
    const bookmarks = await Bookmark.find({
      userBy: _id,
      categoryId: id,
    });
    res.json({ bookmarks: bookmarks });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ message: "error in fetching bookmark category wise" });
  }
};

//test:success
module.exports.getBookmark = async (req, res) => {
  const { id } = req.params;
  try {
    const bookmark = await Bookmark.find({
      _id: id,
    });
    res.json({ bookmark: bookmark });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "error in getting bookmark" });
  }
};

//test:success
module.exports.updateBookmark = async (req, res) => {
  const { id } = req.params;
  const { title, desc, category, categoryId } = req.body;
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(id, {
      title,
      description: desc,
      category,
      categoryId,
    });
    res.json({ bookmark: bookmark });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "error in getting bookmark" });
  }
};

//test:success
module.exports.deleteBookmark = async (req, res) => {
  const { id } = req.params;
  try {
    const bookmark = await Bookmark.findByIdAndRemove(id);
    res.json({ bookmark: bookmark });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "error in getting bookmark" });
  }
};

//test:success
module.exports.getCountBookmarkByCategory = async (req, res) => {
  const { _id } = req.user;
  const { categoryId } = req.body;
  const categoryWiseCountQurey = {
    userBy: _id,
    categoryId,
  };
  const allBookmarksCountQurey = {
    userBy: _id,
  };

  try {
    if (!categoryId) {
      const count = await Bookmark.find(allBookmarksCountQurey).count();
      return res.json({ count: count });
    }
    const count = await Bookmark.find(categoryWiseCountQurey).count();
    res.json({ count: count });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "error in counting bookmark" });
  }
};

//test:success
module.exports.deleteBookmarkByCategory = async (req, res) => {
  const { id } = req.params;
  const {_id} =req.user
  try {
    //1.delete category
    await Category.deleteOne({userBy:_id,_id: id });

    //2.delete bookmarks belongs to category
    await Bookmark.deleteMany({userBy:_id,categoryId: id });
    res.json({ message: "Successfully Deleted" });
  } catch (e) {
    console.log(e);
  }
};
