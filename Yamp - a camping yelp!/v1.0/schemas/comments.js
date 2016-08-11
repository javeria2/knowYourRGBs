var mongoose = require("mongoose");

var comments = new mongoose.Schema({
	text: String,
	author: {
		username: String,
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		}
	}
});

module.exports = mongoose.model("comments", comments);