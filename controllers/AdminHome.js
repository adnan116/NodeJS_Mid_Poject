var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		var today = new Date();
		var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var sysTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

		var data={
		name: req.cookies['username'],
		date: sysDate,
		time: sysTime
		}
		console.log('Home page requested!');
		res.render('Adminhome',data);
	}else{
		res.redirect('/logout');
	}
});

module.exports = router;