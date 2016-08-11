var camps = require("../../schemas/camps"),
	comment = require("../../schemas/comments");

var retObj = {};

retObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash("error", "Please log-in first.");
		res.redirect("/login");
	}
}


retObj.isAuthenticated_comment = function(req, res, next){
	if(req.isAuthenticated()){
		comment.findById(req.params.commentId, function(err, comments){
			if(err) {
				res.redirect("next");
			} else {
				if(comments.author.id.equals(req.user._id)){
					next();
				} else {
					resq.flash("error", "Permission denied.");
				}
			}
		});
	} else {
		req.flash("error", "you're not logged in.");
	}
}


retObj.isAuthenticated_camp = function(req, res, next){
	if(req.isAuthenticated()){
		camps.findById(req.params.id, function(err, camps){
			if(err) {
				req.flash("error", "The camp you're looking for doesn't exist.");
				res.redirect("next");
			} else {
				if(camps.author.id.equals(req.user._id)){
					next();
				} else {
					resq.flash("error", "Permission denied.");
				}
			}
		});
	} else {
		req.flash("error", "you're not logged in.");
		res.redirect("back");
	}
}

module.exports = retObj;