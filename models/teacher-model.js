var db = require('./db');

module.exports ={
	getByUserId: function(id, callback){
		var sql = "select * from teachers where userid=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	updateOwnProfile: function(user, callback){
		var sql = "update teachers set fname=?, lname=?, contact=?, dept=? where userid=?";
		db.execute(sql, [user.fname, user.lname, user.contact, user.dept, user.userid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}