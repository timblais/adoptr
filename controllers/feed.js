const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require('../models/User')


module.exports = {
    getFeed: async (req, res) => {
        try {
          const posts = await Post.find({ user: req.user._id });
          const users = await User.find({ active: true });
          res.render("feed.ejs", { posts: posts, user: req.user, users: users  });
        } catch (err) {
          console.log(err);
        }
      },
}