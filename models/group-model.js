var db = require('./db');

module.exports ={
	
	getAllGroupsNumbers:function(callback){
		var sql = "select distinct group_id from research_group";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	getAllGroupByTopic: function(topic, callback){
		var sql = "select * from research_group where topicName=?";
		db.getResult(sql, [topic], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	allocateExternal: function(allocation, callback){
		var sql = "update research_group set external=?, status='active'where group_id=?";
		db.execute(sql, [allocation.external, allocation.group_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

}