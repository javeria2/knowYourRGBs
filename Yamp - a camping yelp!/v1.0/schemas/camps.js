var mongoose = require("mongoose");

//static testing data
var tests = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	rating: Number,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comments"
		}
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String
	}
});

var camps = mongoose.model("camps", tests);
module.exports = camps;