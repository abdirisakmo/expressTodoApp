const express = require('express');
const members = require('../../Members');
const router = express.Router();
const uuid = require('uuid');

//get all members
router.get('/',(req,res)=>{
    res.json(members);
});

//get a single member
router.get('/:id',(req,res)=>{

    const found = members.some(members=>members.id===parseInt(req.params.id));
    if(found){
        res.json(members.filter(members=>members.id===parseInt(req.params.id)));
    }else{
        res.status(400).json({msge:`This member with the id of ${req.params.id} was not found`});
    }

});

//create a member 

router.post('/',(req,res)=>{
   const newMember = {
       id:uuid.v4(),
       name:req.body.name,
       email:req.body.email,
       status:'active'
   }

   if(!newMember.name || !newMember.email){
       return res.status(400).json({msg:'please include the name and email'})
   }

   members.push(newMember);
//    res.json(members);
      res.redirect('/');
});

//update a single member
router.put('/:id',(req,res)=>{

    const found = members.some(members=>members.id===parseInt(req.params.id));
    if(found){
       const updMenmber = req.body;
       members.forEach(member => {
           if(member.id=== parseInt(req.params.id)){
               member.name = updMenmber.name ? updMenmber.name:member.name;
               member.email = updMenmber.email ? updMenmber.email:member.email;

               res.json({msg:'meber was updated',member});
           }
       })
    }else{
        res.status(400).json({msge:`This member with the id of ${req.params.id} was not found`});
    }

});

//Delete a single member
router.delete('/:id',(req,res)=>{

    const found = members.some(members=>members.id===parseInt(req.params.id));
    if(found){
        res.json({msg:'member was deleted',members:members.filter(members=>members.id !== parseInt(req.params.id))});
    }else{
        res.status(400).json({msge:`This member with the id of ${req.params.id} was not found`});
    }

});

module.exports = router;