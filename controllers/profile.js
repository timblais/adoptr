const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require('../models/User')


module.exports = {
    getProfile: async (req, res) => {
        try {
          const posts = await Post.find({ user: req.params.id });
          const users = await User.find({ active: true });
          console.log(users)
          res.render("profile.ejs", { posts: posts, user: req.user, users: users });
        } catch (err) {
          console.log(err);
        }
      },
}
