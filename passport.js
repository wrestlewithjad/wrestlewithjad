var LocalStrategy   = require('passport-local').Strategy;  //Might want to store session info in Redis store instead of cookies or might need to hash user ID.
var bcrypt = require('bcrypt-nodejs');						//Need to fix desereializeUser so that it works correctly


var knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: './airports.sqlite3'
	},
	migrations: {
		tableName: 'airports'
	}
});

module.exports = function(passport){
	passport.serializeUser(function(user, done) {
	console.log("SU",user,done)
  done(null, user);   //this value is stored in req.session.passport.user
});

passport.deserializeUser(function(id, done) {
  
	console.log("DU",id,done)
	findUserByID(id).then(function(value){
		if(value)
			done(null, value);
		else
			done('no session exists',value)
	})
	// User.findById(id, function(err, user) {
 //            done(err, user);
 //        });

  
});



passport.use('local-signup',new LocalStrategy(
	function(username,password,callback){
	//console.log("")
	process.nextTick(function(){
		//email = "hello"

		knex.select('username').from('users').where({username:username}).then(function(value){ //find a user in table with correct email
			if(value.length>0){
				return callback(null,false);  //This sends back a 401 error.
				//return callback(null,false,req.flash('signupMessage', 'That email is already taken.'))
			}
			addUser(username,password).then(function(value){
				console.log('UN',username,'PW',password,'HASH',value)
					return callback(null,value[0])			
			})
			
		
			
			
		})
	})
}))

passport.use('local-login',new LocalStrategy(
	function(username,password,callback){
	//console.log("")
	process.nextTick(function(){
		//email = "hello"

		knex.select().from('users').where({username:username}).then(function(value){ //find a user in table with correct email
			console.log("userValue",value)
			if(value.length>0){
				comparePassword(value[0].password,password).then(function(newValue){
					if(newValue ===true)
						return callback(null,value[0].userID);
					else
						return callback(null,false);  
				}).catch(function(value){
					console.log("bad password",value)
					return callback(null,false);
					//return callback(null,value[0].userID);  
				})
				

			}else{
				return callback(null,false)
			}
			
		})
	})
}))




}
function hashPassword(password) {

	return new Promise(function(resolve, reject) {

		bcrypt.hash(password, null, null, function(err, hash) {
			console.log('this hash', hash)
			if (err) reject(err)
			else resolve(hash)
		});
	})
};

function comparePassword(passwordHashFromDatabase, attemptedPassword) {
	console.log("hhhhhh")
	console.log('data',passwordHashFromDatabase,'mine',attemptedPassword)
	return new Promise(function(resolve, reject) {

		bcrypt.compare(attemptedPassword, passwordHashFromDatabase, function(err, res) {
			if (err) reject(err)
			else resolve(res)
		});
	})
};

function addUser(userName, password) {
	return hashPassword(password)
		.then(function(hashWord) {
			return knex('users').insert({
				username: userName,
				password: hashWord
			}).then(function(value){
				console.log("what is this",value)
				return value
			})
		})
}
var findUserByID = function(ID) {
	return knex.select().from('users').where({
		userID: ID
	}).then(function(value) {
		//console.log('value',value)
		if (value.length > 0) {
			return value[0];
		}
		return false;
	})
}