var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    console.log('Faculty allocate requested!');
    res.render('AdminAllocateFaculty');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;