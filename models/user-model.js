var db = require('./db');

module.exports ={
	validate: function(user, callback){
		var sql = "select * from login where userid=? and password=? and role ='admin'";
		db.getResult(sql, [user.userid, user.password], function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	updatePassword: function(user, callback){
		var sql = "update login set password=? where userid=?";
		db.execute(sql, [user.newpass, user.userid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}