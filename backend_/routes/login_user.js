var express = require('express');
var bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var router = express.Router();

var database = require('../database/db');
let user_ = require("../database/controller/all_models").user


router.post('/signup', function(req, res, next) {
    var name = req.body.userName || '';
    var password = req.body.userPassword || '';
	var passwordConfirmed = req.body.userPasswordConfirm || '';
	
	if(!name) {
		res.json({err: true, info: "Name darf nicht leer sein"});
	} else if(!password || password.length < 8) {
		res.json({err: true, info: "Passwort muss mindestens 8 Zeichen lang sein"});
	} else if(password != passwordConfirmed) {
		res.json({err: true, info: "Passwoerter stimmen nicht ueberein"});
	} else {
		const saltRounds = 10;
		bcrypt.hash(password, saltRounds, function (err, hash) {
			var newUser = user_.build({
				name: name,
				password: hash
			});

			newUser.save().catch(error => {
				console.log('Error while inserting: ' + error.stack);
			});
		
			res.json({err: false, info: "Erfolg"});
		});
	}
});

passport.use(new Strategy({
  usernameField: 'loginNameOrEmail',
  passwordField: 'loginPassword'
  }, function (name, password, done) {
	  
		user_.findOne({
		  attributes: ['id', 'name', 'password'],
		  where: {name: name, activatedAt: {[database.sequelize.Op.ne]: null}}
		}).then(user => {
			if(user) {
				bcrypt.compare(password, user.password, function (err, result) {
					if(result === true) {
						console.log("Erfolg");
						return done(null, user);
					} else {
						console.log("kein erfolg");
						return done(null, false);
					}
				});
			} else {
				console.log("Error");
				return done(null, false);
			}
		});
	}
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

router.post('/login', passport.authenticate('local', {session: true, failureRedirect: '/'}), function (req, res, next) {
    var name = req.body.loginName || '';
    var password = req.body.loginPassword || '';
	
	var day = 60000 * 60 * 24;
	req.session.cookie.expires = new Date(Date.now() + day);
	req.session.cookie.maxAge = day;

	res.json({err: false, info: "Erfolg", loginId: req.user.id});
});

router.get('/', function(req, res, next) {

    res.json({err: true, info: "Das hat nicht geklappt!"});
});

module.exports = router;