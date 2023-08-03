const Post = require('../models/post');
module.exports.home = async (req, res) => {
    try{
        const posts = await Post.find({}).populate('user');
        return res.render('home', {
            title: "home",
            posts: posts
        });
    }catch(err){
        console.log('Erron in home controller ', err);
        return res.status(500).send('Internal server error')
    }
}

// module.exports.actionName = function(req,res){};