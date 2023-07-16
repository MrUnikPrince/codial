module.exports.home = (req,res) =>{
    return res.render('home',{
        title: "home"
    });
}

// module.exports.actionName = function(req,res){};