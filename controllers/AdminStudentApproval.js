var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    console.log('Student approval requested!');
    res.render('AdminStudentApproval');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;