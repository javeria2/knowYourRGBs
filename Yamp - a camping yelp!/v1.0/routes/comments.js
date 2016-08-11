var router = require("express").Router({mergeParams: true});
	camps = require("../schemas/camps");
	comment = require("../schemas/comments");
	middleware = require("../public/middlewares/middleware");


//Comments routes
router.get("/new", middleware.isLoggedIn, function(req, res){
	camps.findById(req.params.id, function(err, camps){
		if(err){
			throw err;
		}else {
		 	res.render("comments/new", {camps: camps});
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){
	camps.findById(req.params.id, function(err, camp){
		if(err) {
			throw err;
			req.flash("error", "something went wrong :(");
			res.redirect("/campgrounds");
		} else {
			comment.create(req.body.comment, function(err, comments){
				if(err) {
					throw err;
					req.flash("error", "something went wrong :(");
				} else {
					comments.author.username = req.user.username;
					comments.author.id = req.user._id;
					comments.save();
					camp.comments.push(comments);
					camp.save();
					res.redirect("/camps/"+camp._id);
					req.flash("success", "comment posted!");
				}
			});
		}
	});
});

//edit
router.get("/:commentId/edit", middleware.isAuthenticated_comment, function(req, res){
	comment.findById(req.params.commentId, function(err, comments){
		if(err) {
			throw err;
		} else {	
		res.render("comments/edit",{campId: req.params.id, comment: comments});
		req.flash("success", "edit successful!");
		}
	});
});

router.put("/:commentId", middleware.isAuthenticated_comment, function(req, res){
	comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err){
		if(err) {
			throw err;
		} else {
			res.redirect("/camps/"+req.params.id);
		}
	})
});

//delete 
router.delete("/:commentId/", middleware.isAuthenticated_comment, function(req, res){
	comment.findByIdAndRemove(req.params.commentId, function(err){
		if(err){
			throw err;
		} else {
			res.redirect("/camps/"+req.params.id);
		}
	});
});

module.exports = router;