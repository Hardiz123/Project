const express = require("express");
const router = new express.Router();



router.get('/',(req,res)=>{

    res.render('index');
});

router.get('/add',(req,res)=>{
    res.render('addBird')
})

router.get("/addS", (req, res) => {
  res.render("addSight");
});


module.exports = router;
