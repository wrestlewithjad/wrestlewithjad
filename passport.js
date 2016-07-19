var LocalStrategy = require('passport-local').Strategy; //Might want to store session info in Redis store instead of cookies
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');
var FACEBOOK_ID = '1072551932833605'
var FACEBOOK_SECRET = 'Put your secret here'
var FACEBOOK_CALLBACK_URL = 'http://localhost:4040/facebookLogin/Callback'
var PROFILE_FIELDS = ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'] //This is what tells facebook what to return		
var moreConfig = require('./knexfile.js')
var env = 'staging'
var knex = require('knex')(moreConfig[env])



module.exports = function(passport) {
	passport.serializeUser(function(user, done) { //This is called the first time a user logs in for a session
		console.log("SU", user, done)
		done(null, user.userID); //this value is stored in req.session.passport.user
	});

	passport.deserializeUser(function(id, done) { //This is called every time after the first time the user logs in.
		//I think the reason you don't store entire object in serializeUser is so that if something changes in credentials, you
		//pick it up when you deserializeUser on future attempts.
		findUserByID(id).then(function(value) { //call the findUserByID function
			if (value) //if you get a value back
				done(null, value); //pass it through the function you are using passport as middlewear for.
			else
				done('no session exists', value) //does send back an error
		})
	});



	passport.use('local-signup', new LocalStrategy( //When using local passport and trying to sign up, this gets used.
		function(username, password, callback) { //setting up the strategy
			process.nextTick(function() {
				knex.select().from('users').where({
					username: username
				}).orWhere({
					facebookEmail: username
				}).then(function(value) { //find a user in table with correct email
					if (value.length > 0) { //if that user already exists
						if (value[0].username) { //and the username is taken 
							return callback(null, false); //you can't sign up with that username
						} else {
							return hashPassword(password).then(function(hashword) { //else, that means that account only has a facebook login in it, so now you add the user's username and password to that line
								return knex('users').returning('userID').where({
									facebookEmail: username
								}).update({
									username: username,
									password: hashword
								}).then(function(value) { //update the row on the table with the facebook email
									return callback(null, {
										userID: value[0] //send back an object with the user ID
									})
								})
							})
						}

					} else {	//if the user doesn't already exist
						addUser(username, password).then(function(value) {  //call addUser
							return callback(null, value)		//return the userID
						})
					}
				})
			})
		}))

	passport.use('local-login', new LocalStrategy(		//when trying to log in.
		function(username, password, callback) {
			process.nextTick(function() {
				knex.select().from('users').where({		//grab the users table
					username: username
				}).then(function(value) { //find a user in table with correct email
					if (value.length > 0) {	//if that user exists
						comparePassword(value[0].password, password).then(function(newValue) {  //compare the encrypted password with the input password
							if (newValue === true)
								return callback(null, value[0]);	//if passwords match, return with the userID
							else
								return callback(null, false);		//bad password!
						}).catch(function(value) {				//if an error happens
							return callback(null, false);		//bad something!
						})
					} else {
						return callback(null, false)		//if the user doesn't exist, return bad!
					}

				})
			})
		}))
	passport.use(new FacebookStrategy({		//This is for when you the facebook passport
		clientID: FACEBOOK_ID,
		clientSecret: FACEBOOK_SECRET,		//Facebook needs to know these things
		callbackURL: FACEBOOK_CALLBACK_URL,
		profileFields: PROFILE_FIELDS
	}, function(token, refreshToken, profile, done) {
		process.nextTick(function() {
			knex.select().from('users').where({
				facebookID: profile.id //go to the users table and select everything where the facebookID exists
			}).then(function(value) {	
				if (value.length > 0) {	//then if that exists
					return done(null, value[0]) //already exists
				} else {		//else you need to add the facebook user to the table
					addFacebookUser(profile, token).then(function(userValue) {//which is what this does.
						return done(null, value[0])		//return your value
					})
				}
			})

		})

	}))
}
function hashPassword(password) {  //This is just a basic hash password function

	return new Promise(function(resolve, reject) {

		bcrypt.hash(password, null, null, function(err, hash) {
			console.log('this hash', hash)
			if (err) reject(err)
			else resolve(hash)
		});
	})
};

function comparePassword(passwordHashFromDatabase, attemptedPassword) {		//Basic compare password function
	console.log("hhhhhh")
	console.log('data', passwordHashFromDatabase, 'mine', attemptedPassword)
	return new Promise(function(resolve, reject) {

		bcrypt.compare(attemptedPassword, passwordHashFromDatabase, function(err, res) {
			if (err) reject(err)
			else resolve(res)
		});
	})
};

function addUser(userName, password) {			//This adds a user to the database
	return hashPassword(password)			//hash the password
		.then(function(hashWord) {
			return knex.select().from('users').where({	//select if the facebook account is already in table
				facebookEmail: userName
			}).then(function(value) {		
				if (value.length == 0) {	//then if it doesn't exist
					return knex('users').returning('userID').insert({	//insert your username and password
						username: userName,
						password: hashWord
					}).then(function(value) {	
						return {
							userID: value[0]		//then return the userID
						}
					})
				} else {						//if the facebook account is in there
					return knex('users').where({
						facebookEmail: userName
					}).update({						//update the user to add the new username and password
						username: userName,
						password: hashWord
					}).then(function(newValue) {
						return value
					})

				}
			})
		})
}

function addFacebookUser(user, token) {		//When adding a facebook user
		//check if user exists.  Via email.  If not, make new, if yes, update existing
	return knex.select().from('users').where({
		username: user.emails[0].value
	}).then(function(existingUser) {
		if (existingUser.length > 0) {
			//update user
			return knex('users').where({
				username: user.emails[0].value
			}).update({
				facebookID: user.id,
				facebookToken: token,
				facebookEmail: user.emails[0].value
			})

		} else {
			return knex('users').insert({
					facebookID: user.id,
					facebookToken: token,
					facebookEmail: user.emails[0].value
				})
		}
	})
}
var findUserByID = function(ID) {		//this just finds the user by userID
	return knex.select().from('users').where({
		userID: ID
	}).then(function(value) {
		if (value.length > 0) {
			return value[0];
		}
		return false;
	})
}