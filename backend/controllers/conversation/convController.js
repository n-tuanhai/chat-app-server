const db = require("../../models");
const socket = require("../../server.js");

const { Op } = db.Sequelize;
const bcrypt = require("bcrypt");

const generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = {
  getInfo: (req, res) => {
    db.User.findByPk(req.userData.userId).then(user => {
      if (user) {
        db.User.findOne({
          where : {email : req.body.email}
        }).then(info => {
          if(info){
            res.json({
              ...info.get({ plain: true }),
            });
          }
          else{
            res.json({message : ""})
          }
        });
      } else {
        res.json({ error: "user not found" });
      }
    });
  }
}
