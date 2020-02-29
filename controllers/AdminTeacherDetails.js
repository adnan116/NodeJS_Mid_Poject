var express = require('express');
var router = express.Router();
var teacherModel   = require.main.require('./models/teacher-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	teacherModel.getAllTeachers(function(results){
		if(results.length > 0){
			console.log('Teacher list requested!');
    		res.render('AdminTeacherDetails', {teacherlist: results});
		}else{
			res.send('Null Value');
		}
	});
})

module.exports = router;