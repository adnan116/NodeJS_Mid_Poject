var express 						= require('express');
var router 							= express.Router();
var domainModel   					= require.main.require('./models/domain-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	domainModel.getAllDomains(function(results){
		if(results.length > 0){
			console.log('Domain list requested!');
    		res.render('AdminDomainDetails', {domainlist: results});
		}else{
			res.send('Null Value');
		}
	});
});


module.exports = router;	