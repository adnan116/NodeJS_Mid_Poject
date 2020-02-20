var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    console.log('Student list requested!');
    res.render('AdminStudentDetails');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;