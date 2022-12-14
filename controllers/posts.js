const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require('../models/User');
const Comment = require('../models/Comment');


module.exports = {
  
    getNewPost: (req,res)=>{
        res.render('newPost.ejs', {user: req.user})
    },
  
    createNewPost: async (req, res) => {
      try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.body.postImage);
    
        await Post.create({
          title: req.body.postTitle,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          caption: req.body.postCaption,
          likes: 0,
          user: req.user.id,
        });
        console.log("Post has been added!");
        res.json('Post has been added!');
      } catch (err) {
        console.log(err);
      }
    },

  getPost: async (req, res) => {
    try {
      const posts = await Post.find({ _id: req.params.id });
      const users = await User.find({ active: true });
      const comments = await Comment.find({ postId: req.params.id})
      console.log(users)
      res.render("post.ejs", { posts: posts, user: req.user, users: users, comments: comments});
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res)=>{
    try{
      const thisPost = await Post.findOne({_id:req.body.postIdFromJSFile});  
      if(thisPost.likes.includes(req.user.userName)){
        await Post.findOneAndUpdate({_id:req.body.postIdFromJSFile},{
          $pull: {likes: req.user.userName}
        })
        console.log('unLiked Post')
        res.json('unLiked Post')
      }else{
        await Post.findOneAndUpdate({_id:req.body.postIdFromJSFile},{
          $push: {likes: req.user.userName}
        })
        console.log('Liked Post')
        res.json('Liked Post')
      }

      
    }catch(err){
        console.log(err)
    }
},
  // deletePost: async (req, res) => {
  //   try {
  //     // Find post by id
  //     let post = await Post.findById({ _id: req.params.id });
  //     // Delete image from cloudinary
  //     await cloudinary.uploader.destroy(post.cloudinaryId);
  //     // Delete post from db
  //     await Post.remove({ _id: req.params.id });
  //     console.log("Deleted Post");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },
};

// CreatePost alt:
createNewPost: async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.body.postImage);

    await Post.create({
      title: req.body.postTitle,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      caption: req.body.postCaption,
      likes: 0,
      user: req.user.id,
    });
    console.log("Post has been added!");
    res.redirect(`/profile/${req.user._id}`);
  } catch (err) {
    console.log(err);
  }
}