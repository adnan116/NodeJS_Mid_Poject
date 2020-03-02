var db = require('./db');

module.exports ={
	getByUserId: function(id, callback){
		var sql = "select * from students where userid=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	addStudent: function(user, callback){
		var sql = "insert into students values(?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, user.userid, user.fname, user.lname, user.email, user.contact, user.dept, user.credit, user.cgpa, user.regDate, user.status], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	getAllStudents:function(callback){
		var sql = "select * from students";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	getById: function(id, callback){
		var sql = "select * from students where id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	updateStudent: function(user, callback){
		var sql = "update students set userid=?, fname=?, lname=?, email=?, contact=?, dept=?, credit=?, cgpa=? where id=?";
		db.execute(sql, [user.userid, user.fname, user.lname, user.email, user.contact, user.dept, user.credit, user.cgpa, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteStudent: function(id, callback){
		var sql = "delete from students where userid=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}