var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    console.log('Offer topic requested!');
    res.render('AdminOfferTopic');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;