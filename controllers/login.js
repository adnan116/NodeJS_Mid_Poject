var express = require('express');
var router = express.Router();
var userModel	= require.main.require('./models/user-model');


router.get('/',function(req,res){
	console.log('login page requested!');
	res.render('login');
});

router.post('/', function(req, res){
	
	var user ={
		userid: req.body.uname,
		password: req.body.password
	};

	userModel.validate(user, function(result){
		if(result){
			res.cookie('username', req.body.uname);
			res.cookie('password', req.body.password);
			res.redirect('/Adminhome');
		}else{
			var error ={
				message: 'Invalid Username/Password'
			};

			//res.render('../views/login', {errors: error});
			res.redirect('/login');
		}
	});
});

module.exports = router;