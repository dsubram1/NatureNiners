var mongoose= require('mongoose');
//mongoose.connect("mongodb://localhost/naturenet");
mongoose.connect("mongodb://nature_niners:nature123@ds123929.mlab.com:23929/naturenet");
var actionSchema= new mongoose.Schema({
	title: String,
	topic: String,
	pubDate: {type:Date, default: Date.now}	,
	updatedDate: {type:Date, default: Date.now},
	content: String,
	image: String,
	location: String,
	startTime: String,
	endTime: String,
	likes_Count: Number,
	expLikes: Number,
	author:{
		id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	username: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	events:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Action"
	}]
});

var Action= mongoose.model("Action",actionSchema);
module.exports= Action;
