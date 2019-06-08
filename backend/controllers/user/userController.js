const db = require("../../models");
const socket = require("../../server.js");

const { Op } = db.Sequelize;
const bcrypt = require("bcrypt");

const generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = {
  update: (req,res) =>{
    db.User.findByPk(req.params.id).then(updateUser =>{
      if(updateUser){

           db.User.update(
             {
               username : req.body.username,
               facebookLink: req.body.facebookLink,
               phoneNumber: req.body.phoneNumber,
               city: req.body.city,
               gender : req.body.gender,
               age : req.body.age,
             },
             {where :{id : req.params.id}}
           ).then(newUpdate => {
             if(newUpdate){
                res.status(200).json({
                    message : "Update Successfully"
                });
             }
             else{
               res.status(422).json({
                 message : "Failed"
               });
             }
           });
      }
      else{
        res.status(422).json({
          message: "Update Failed"
        });
      }
     });
  },

  change : (req, res) =>{
    db.User.findByPk(req.params.id).then(change =>{
      if(change){
         bcrypt.compare(req.body.password, change.password).then(result =>{
           if(result){
             db.User.update({
               password : generateHash(req.body.newpassword),
             },
             {where : {id : req.params.id}}
           ).then(newpass =>{
              if(newpass){
                res.status(200).json({
                  message : "Change successfuly"
                });
              }
          else{
             res.status(422).json({
               message : "Can't update!!!"
             });
           }
         });
       }else{
         res.status(422).json({
           message : "Enter wrong password!!!"
         });
       }
         }).catch(err =>{
           res.status(401).json({
             message : "Auth failed"
           });
         });
      }else{
        res.status(422).json({
          message : "Not this person"
        });
      }
    });
  },

  test : (req ,res)=>{
    res.status(200).json({
      message : req.params.id
  });
}
};
