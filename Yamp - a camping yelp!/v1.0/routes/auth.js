var router = require("express").Router();
	passport = require("passport");
	local = require("passport-local");
	user = require("../schemas/users");

// =============
//  AUTH ROUTES
// =============

//Sign up
router.get("/signup", function(req, res){
	res.render("register");
});

router.post("/signup", function(req, res){
	var newUser = new user({username: req.body.username});
	var pass = req.body.password;
	user.register(newUser, pass, function(err, user){
		if(err) {
			req.flash("error", err.message);
			res.render("register");
		} else {
			passport.authenticate("local")(req, res, function(){
				res.redirect("/camps");
				req.flash("success", "Hello " + user.username + ", sign-up successful!");
			});
		}
	});
});

//login 
router.get("/login", function(req, res){
	res.render("login");
});

//middleware auth
router.post("/login", passport.authenticate("local", {
	successRedirect: "/camps",
	failureRedirect: "/login"
}));

router.get("/logout", function(req, res){
	req.flash("success", "See you soon, " + req.user.username + "!");
	req.logout();
	res.redirect("/camps");
});

module.exports = router;