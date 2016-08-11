var express = require("express"),
	app = express(),
	bodyparser = require("body-parser"),
	mongoose = require("mongoose"),
	camps = require("./schemas/camps"),
	seeds = require("./extras/seeds"),
	comment = require("./schemas/comments"),
	passport = require("passport"),
	local = require("passport-local"),
	user = require("./schemas/users"),
	override_ = require("method-override"),
	flash = require("connect-flash"),

	comments = require("./routes/comments"),
	init = require("./routes/init"),
	auth = require("./routes/auth");

//seed the database manually for testing purposes
 // seeds(); 

//save the pain of writing .ejs after each render
app.set("view engine","ejs");
app.use(flash());

// =============
//PASSPORT SETUP
// =============

//the next three commands have to be always in this order
app.use(require("express-session")({
	secret: "my name is sanchay javeria",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser(user.serializeUser());

passport.deserializeUser(user.deserializeUser());

passport.use(new local(user.authenticate()));

//include body parser for post requests
app.use(bodyparser.urlencoded({extended: true}));

//setup mongoose 
// mongoose.connect("mongodb://localhost/yampdb");
mongoose.connect("mongodb://javeria2:password@ds139685.mlab.com:39685/yamp");

//lookup js and css in public directory __dirname refers to current dir
app.use(express.static(__dirname + "/public"));

app.use(override_("_method"));

//custom middleware, whatever we put in locals is available to all routes
app.use(function(req, res, next){
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
});

// ==============
// ROUTES BEGIN
// ==============

//homepage, intial route
app.get("/", function(req, res){
	res.render("homepage");
});

app.use("/camps", init);
app.use("/camps/:id/comments", comments);
app.use(auth);

// ================
// START THE SERVER
// ================
app.listen(process.env.PORT || 3000);
