var express = require('express');
const { check } = require('express-validator/check');
var bodyParser = require('body-parser');
var http = require('http').Server(server);
var io = require('socket.io')(http);
var cors = require('cors');
const db = require('./models');
let account = require('./controllers/account');
let auth = require('./middleware/check-auth');

var server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

db.sequelize.sync().then(() =>{
    console.log("Successfully connected to db!");
});

//login-logout-register
server.post("/api/register", [
    check('username').isEmail(),
    check("password", "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
], account.register);
server.post("/api/login", account.login);
server.get("/api/logout", account.logout);

var listen = server.listen(3000, () => {
    console.log("server is running on port", listen.address().port);
});