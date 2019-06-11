var express = require('express');
const { check } = require('express-validator/check');
var bodyParser = require('body-parser');
var http = require('http').Server(server);
var socket = require('socket.io');
var cors = require('cors');
const db = require('./models');
let account = require('./controllers/account');
const auth = require('./middleware/check-auth');

var server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

db.sequelize.sync().then(() => {
    console.log("Successfully connected to db!");
});

server.use("/api/", require("./controllers/auth/index.js"));

server.use("/api/user", require("./controllers/user/index.js"));

server.use("/api/conv", require("./controllers/conversation/index.js"));

server.use("*", (req, res) => {
  res.status(404).json({ message: "Wrong direction" });
});

var listen = server.listen(3000, () => {
    console.log("server is running on port", listen.address().port);
});

//socket setup
var io = socket(listen);

io.on('connection', function (socket) {
    console.log('Made socket connection', socket.id);

    socket.on('join-room', function (data) {
        db.User.findOne({
            where: { 'id': data.sendFrom }
        }).then(user => {
            if (user != null) {
                db.Conversation.findOne({
                    where: { 'convoID': data.sendFrom + data.sendTo}
                }).then(convo => {
                    if (convo == null) {
                        db.Conversation.create({
                            convoID: data.sendFrom + data.sendTo,
                            userID: data.sendFrom
                        })
                        db.Conversation.create({
                            convoID: data.sendFrom + data.sendTo,
                            userID: data.sendTo
                        })
                    }
                    socket.join(convo.convoID);
                  })
              }
          })
      })


    socket.on('chat', function (data) {
        db.User.findOne({
            where: { 'id': data.sendFrom }
        }).then(user => {
            if (user != null) {
                const newMess = db.Message.build({
                    sendFrom: data.sendFrom,
                    sendTo: data.sendTo,
                    content: data.content,
                })
                newMess.save();
                socket.broadcast.to(data.convoID).emit('incoming-message', newMess.get({ plain: true }));
            }
        })
    })
})
