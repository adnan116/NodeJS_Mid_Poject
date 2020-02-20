var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    console.log('Teacher add requested!');
    res.render('AdminTeacherReg');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;