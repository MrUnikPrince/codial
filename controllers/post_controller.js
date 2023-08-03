const Post = require('../models/post');
const Comment = require('../models/comment');

// Post create
module.exports.create = async (req, res) => {
   try {
      const post = await Post.create({
         content: req.body.content,
         user: req.user._id,
      });
      return res.redirect('back');
   } catch (err) {
      console.log(`Error in creating post ${err}`);
      return res.redirect('/users/sign-in');
   }
};

// Post delete
module.exports.destroy = async (req, res) => {
   try{
      const post = await Post.findById(req.params.id);
      if(post.user == req.user.id){
         // Delete the post
         await Post.deleteOne({ _id: req.params.id });

         // delete associated comments
         const deletedComment = await Comment.deleteMany({post: req.params.id});
         if(deletedComment){
            return res.redirect('back')
         }
      }else{
         return res.redirect('back');
      }
   }catch(err){
      console.log(`Error in deleting user's post ${err}`);
   }
}