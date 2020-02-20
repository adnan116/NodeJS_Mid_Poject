var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		var data={
		name: req.cookies['username']
		}
		console.log('Home page requested!');
		res.render('Adminhome',data);
	}else{
		res.redirect('/logout');
	}
});

module.exports = router;