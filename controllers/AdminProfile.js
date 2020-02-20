var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    console.log('Admin profile requested!');
    res.render('AdminProfile');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;