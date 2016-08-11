var mongoose = require("mongoose");
var camps = require("../schemas/camps");
var comments = require("../schemas/comments");

//testing data
var newCamps = [
{name: "Yellowstone", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg", description: "A fun place under the sun. Major drawback is that it gets pretty cold by the end. However, the view compensates for that. Also, the river across is dope!"},
{name: "Grand Canyon", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg", description: "Lorem ipsum dolor sit amet, nam ne nemore omnesque repudiandae, no sed vidit iisque. Vel quis vocent sadipscing id. Nec enim decore accumsan ne, eos ex solum mundi. Nam alterum verterem imperdiet et"},
{name: "Alpine Woods", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg", description: "Est idque facete placerat eu, insolens maiestatis scriptorem ex has. Sea unum labores recusabo ex, exerci doctus propriae ei vim. His probo illum liberavisse no, natum probo accumsan te has. Solet mollis duo id, vis animal feugait in. Abhorreant constituam eam cu. Ut melius deserunt periculis his."}
];

//remove all camps
function seeds() {
	camps.remove({}, function(err){
		if(err) {
			throw err;
		} else {
			console.log("removed!");
			newCamps.forEach(function(camp){
				camps.create(camp, function(err, camp){
					if(err){
						throw err;
					} else {
						console.log("testing data added!");
						comments.create({text: "awesome place!", author: "Swag yolo"}, function(err, comments){
							if(err) {
								throw err;
							} else {
								camp.comments.push(comments);
								camp.save();
								console.log("comment added!");
							}
						});
					}
				});
			});
		}
	 });
}

module.exports = seeds;