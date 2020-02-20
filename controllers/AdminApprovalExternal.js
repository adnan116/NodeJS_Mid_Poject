var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    console.log('Approve external requested!');
    res.render('AdminApprovalExternal');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;