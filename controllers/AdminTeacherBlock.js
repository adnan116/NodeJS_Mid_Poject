var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    console.log('Teacher block requested!');
    res.render('AdminTeacherBlock');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;