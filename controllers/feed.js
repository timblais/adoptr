const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require('../models/User');
const Comment = require('../models/Comment');


module.exports = {
    getFeed: async (req, res) => {
        try {
          const postsUnsorted = await Post.find({});
          const posts = postsUnsorted.sort((a,b) => b.createdAt - a.createdAt)
          const users = await User.find({ active: true });
          const comments = await Comment.find({})
          res.render("feed.ejs", { posts: posts, user: req.user, users: users, comments: comments  });
        } catch (err) {
          console.log(err);
        }
      },
}