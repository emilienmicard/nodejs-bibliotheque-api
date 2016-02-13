var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('Book', new Schema({
	id: Number,
	name: String,
	author: String,
    description: String,
    imagefilename: String,
    imagesubpath: String
}));