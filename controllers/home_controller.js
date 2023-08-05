const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async (req, res) => {
    try {
        const posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        const users = await User.find({});
        return res.render('home', {
            title: "home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log('Error in home controller ', err);
        return res.status(500).send('Internal server error')
    }
}

// module.exports.actionName = function(req,res){};