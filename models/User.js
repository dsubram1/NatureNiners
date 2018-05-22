var mongoose= require('mongoose');
//mongoose.connect("mongodb://localhost/naturenet");
mongoose.connect("mongodb://nature_niners:nature123@ds123929.mlab.com:23929/naturenet");
var passportLocalMongoose= require('passport-local-mongoose');
var Action= require('./Action');
var jwt = require('jsonwebtoken');

var userSchema= new mongoose.Schema({
	firstName: String,
	lastName: String,
	username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
	email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
	password: String,
	phoneNumber: Number,
	subscription: String,
	dob: Date,
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Action"
	}],
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

userSchema.plugin(passportLocalMongoose);

var User= mongoose.model("User",userSchema);
module.exports= User;
