var express 						= require('express');
var router 							= express.Router();
var teacherModel   					= require.main.require('./models/teacher-model');
var topicModel   					= require.main.require('./models/topic-model');
const { check, validationResult } 	= require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	topicModel.getAllTopics(function(results){
		if(results.length > 0){
			console.log('Topic list requested!');
    		res.render('AdminTopicDetails', {topiclist: results});
		}else{
			res.send('Null Value');
		}
	});
})

router.get('/AdminTeacherUpdate/:id',[
  check('userid', 'UserID is required').isEmpty(),
  check('fname', 'First Name is required').isEmpty(),
  check('lname', 'Last Name is required').isEmpty(),
  check('email', 'Email is not valid').isEmpty(),
  check('contact', 'Contact No is required').isEmpty(),
  check('dept', 'Department Name is required').isEmpty()
  ] , function(req, res){
	var errors = validationResult(req);
	teacherModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('AdminTeacherUpdate', {teacher: result[0], error:errors.mapped()});
	});
});

router.post('/AdminTeacherUpdate/:id', [
  check('userid', 'UserID is required').not().isEmpty(),
  check('fname', 'First Name is required').not().isEmpty(),
  check('lname', 'Last Name is required').not().isEmpty(),
  check('email', 'Email is not valid').not().isEmpty().isEmail(),
  check('contact', 'Contact No is required').not().isEmpty(),
  check('dept', 'Department Name is required').not().isEmpty()
  ], function(req, res){
	
	var teacher = {
		userid: req.body.userid,
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		contact: req.body.contact,
		dept: req.body.dept,
		id: req.params.id
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
    	//console.log(errors.mapped());
    	//var allErrors = errors.mapped();
    	//console.log(allErrors);
    	var teachers = matchedData(req);
    	console.log(teachers);
    	teacherModel.getById(req.params.id, function(result){
			res.render('AdminTeacherUpdate', {teacher: teachers, error:errors.mapped()});
		});
    }else{
		teacherModel.updateTeacher(teacher, function(status){
			console.log(status);
			if (status) {
				res.redirect('/AdminTeacherDetails');
			}else{
				res.redirect('/AdminTeacherDetails/AdminTeacherUpdate/'+req.params.id);
			}	
		});
	}
});

router.get('/AdminTeacherDelete/:id', function(req, res){
	
	teacherModel.getByUserId(req.params.id, function(result){
		//console.log(result);
		res.render('AdminTeacherDelete', {teacherDel: result[0]});
	});
});

router.post('/AdminTeacherDelete/:id', function(req, res){
	
	console.log(req.params.id);
	teacherModel.deleteTeacher(req.params.id, function(status){
		if(status){
			console.log(status);
			userModel.deleteUser(req.params.id, function(status1){
				if(status1){
					console.log(status1);
					res.redirect('/AdminTeacherDetails');
				}else{
					res.redirect('/AdminTeacherDelete/'+req.params.id);
				}
			});
		}else{
			res.redirect('/AdminTeacherDelete/'+req.params.id);
		}
	});
});

module.exports = router;	