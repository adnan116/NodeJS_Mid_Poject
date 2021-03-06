var express = require('express');
var router = express.Router();
var teacherModel   				  = require.main.require('./models/teacher-model');
var groupModel   				  = require.main.require('./models/group-model');
var topicModel   				  = require.main.require('./models/topic-model');
const { check, validationResult } = require('express-validator/check');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});

router.get('/', [
  check('group_id', 'Group number is required').isEmpty(),
  check('external', 'External name is required').isEmpty()
  ] , function(req, res){
  	console.log('External allocation requested!');
  	var errors = validationResult(req);
		groupModel.getAllGroupsNumbers(function(groupResults){
			console.log(groupResults);
			if(groupResults.length > 0){
				teacherModel.getAllTeachers(function(teacherResults){
					console.log(teacherResults);
					if(teacherResults.length > 0){
						//console.log(topicResults);
						//console.log(groupResults);
						//console.log(teacherResults);
	    				res.render('AdminAllocateFaculty', {grouplist: groupResults,teacherlist: teacherResults,error:errors.mapped()});
					}else{
						res.render('AdminAllocateFaculty', {grouplist: [],teacherlist: [],error:errors.mapped()});
					}
				});
			}else{
				res.render('AdminAllocateFaculty', {grouplist: [],teacherlist: [],error:errors.mapped()});
			}
		});
})


  
router.post('/', [
  check('group_id', 'Group number is required').not().isEmpty(),
  check('external', 'External name is required').not().isEmpty()
  ], function(req, res){
	
	var externalAllocate = {
		external: req.body.external,
		group_id: req.body.group_id
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.mapped());
    	res.render('AdminAllocateFaculty', {error:errors.mapped()});	
    }else{
		groupModel.allocateExternal(externalAllocate, function(status){
		console.log(status);
		if (status) {
			res.redirect('/AdminHome')
		}else{
			res.redirect('/AdminAllocateFaculty');
		}
				
		});
	}
});

module.exports = router;