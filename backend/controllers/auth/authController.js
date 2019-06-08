const db = require("../../models");
const socket = require("../../server.js");

const { Op } = db.Sequelize;
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");

const generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const jwt = require('jsonwebtoken');
const secretkey = 'u4AOqGP4pgSP2z1hsG6ZCkrkEIE7ayEsf9nbbFQlBbTCNXWJmn5NE1CUauxQgYD';


module.exports = {
    login: (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error(`Validation error: ${JSON.stringify(errors.array())}`);
        res.status(422).json({ errors: errors.array() });
      } else {
        db.User.findOne({
          where: { email: req.body.email }
        }).then(user => {
          if (user == null) {
            res.status(422).json({
              message: "Auth failed"
            });
            console.log("User does not exist!");
          } else {
            bcrypt.compare(req.body.password, user.password).then(result => {
              if (!result) {
                res.status(422).json({
                  message: "Auth failed!"
                });
              } else {
                jwt.sign({
                  username: user.username,
                  userId: user.id
                }, secretkey, { algorithm: "HS512" }, (err, token) => {
                  if (err) {
                    res.status(422).json({
                      message: "Auth failed",
                    });
                  } else {
                    res.status(200).json({
                      message: "Logged in successfully",
                      token,
                      user
                    });
                  }
                });
              }
            }).catch(err => {
              console.error(err);
              res.status(422).json({
                message: "Auth failed!"
              });
            });
          }
        });
      }
    },

    register: (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error(`Validation error: ${JSON.stringify(errors.array())}`);
        res.status(422).json({ errors: errors.array() });
      } else {
        const newUser = db.User.build({
          email: req.body.email,
          username: req.body.username,
          password: generateHash(req.body.password)
        });

        db.User.findOne({
          where: { username: req.body.username }
        }).then(user => {
          if (user == null) {
            newUser.save();
            res.status(200).json({
              message: "Registered successfully"
            });
          } else {
            console.log("User already exists!");
            res.status(422).json({
              message: "User already exists"
            });
          }
        });
      }
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



};
