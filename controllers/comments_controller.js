const Comment = require('../models/comment');
const Post = require('../models/post')

module.exports.create = async (req, res) => {
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                post: req.body._id
            });
            post.comments.push(comment);
            await post.save();
            res.redirect('/');

        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}