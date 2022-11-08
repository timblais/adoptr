const Comment = require('../models/Comment');

module.exports = {
    postComment: async (req,res) => {
        try {
            await Comment.create({
              text: req.body.text,
              user: req.user.id,
              postId: req.body.postId,
            });
            console.log("Comment has been added!");
            res.redirect(`/post/${req.body.postId}`);
          } catch (err) {
            console.log(err);
          }
    }
}