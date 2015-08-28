var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/wokdata');
var Schema = mongoose.Schema;
var infoScheMa = new Schema({
	title:{label:String,value:String},
	source:[{label:String,value:String}],
	uid:String,
	authors:{label:String,value:String}
});

exports.info = db.model('wok_infos',infoScheMa);