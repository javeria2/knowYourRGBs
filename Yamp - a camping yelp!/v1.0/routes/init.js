var router = require("express").Router({mergeParams: true});
	camps = require("../schemas/camps");
	middleware = require("../public/middlewares/middleware");

//following the RESTful convention
//get request for camp listing
router.get("/", function(req, res){
	camps.find({}, function(err, camps){
		if(err) {
			throw err;
		} else {
			res.render("camps/camps", {camps: camps, user: req.user});
		}
	});
});

//add a new camp
router.get("/new", middleware.isLoggedIn, function(req, res){
	 res.render("camps/new");
});


//post request for adding a new camp
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var imageUrl = req.body.image;
	var desc = req.body.description;
	var rating = req.body.rating;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newOb = {name: name, image: imageUrl, description: desc, rating: rating, author: author};
	camps.create(newOb, function(err, camps){
		if(err) {
			throw err;
		} else {
			req.flash("success", "New camp added!");
			res.redirect("/camps");
		}
	});
});

//view description of a camp (show)
router.get("/:campid", function(req, res){
	camps.findById(req.params.campid).populate("comments").exec(function(err, result){
		if(err){
			throw err;
		}else {
		 	res.render("camps/description", {camps: result});
		}
	});
});

//edit campground
router.get("/:id/edit", middleware.isAuthenticated_camp, function(req, res){
	camps.findById(req.params.id, function(err, camps){
		res.render("camps/edit", {camps: camps});
	});
});

router.put("/:id", middleware.isAuthenticated_camp, function(req, res){
	var obj = {
		name: req.body.name, 
		image: req.body.image,
		description: req.body.description,
		rating: req.body.rating
	};

	camps.findByIdAndUpdate(req.params.id, obj, function(err, updates){
		if(err) {
			throw err; 
		} else {
			res.redirect("/camps/"+req.params.id);
			req.flash("success", "edit successful!");
		}
	});
});

//delete camp
router.delete("/:id", middleware.isAuthenticated_camp, function(req, res){
	camps.findByIdAndRemove(req.params.id, function(err){
		if(err){
			throw err;
			res.redirect("/camps/"+req.params.id);
		} else {
			res.redirect("/camps");
		}
	});
});

module.exports = router;