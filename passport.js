var LocalStrategy   = require('passport-local').Strategy;  //Might want to store session info in Redis store instead of cookies or might need to hash user ID.
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');	
var FACEBOOK_ID = '1072551932833605'
var FACEBOOK_SECRET = '617389ad8cc5282079e63445d7c7091b'
var FACEBOOK_CALLBACK_URL = 'http://localhost:4040/facebookLogin/Callback'	
var PROFILE_FIELDS = ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']			


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
	//console.log("SU",user,done)
  done(null, user);   //this value is stored in req.session.passport.user
});

passport.deserializeUser(function(id, done) {  //The reason you don't store entire object in serializeUser is so that if something changes in credentials, you
  												//pick it up when you deserializeUser on future attempts.
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


passport.use(new FacebookStrategy({
	clientID: FACEBOOK_ID,
	clientSecret: FACEBOOK_SECRET,
	callbackURL : FACEBOOK_CALLBACK_URL,
	profileFields : PROFILE_FIELDS
},function(token,refreshToken,profile,done){
	process.nextTick(function(){
		console.log('profile',profile," ",token, " ",refreshToken)
		//check if in users database
		knex.select().from('users').where({facebookID:profile.id}).then(function(value){
			console.log("THIS VALUE",value)
			if(value.length>0){
				return done(null,value[0])	//already exists
			}
			else{
				addFacebookUser(profile,token).then(function(userValue){
				console.log('HASH',userValue)
					return done(null,value[0])			
			})

				//doesn't exist
				
			}
		})

	})

}))

// passport.use(new GitHubStrategy({
//     clientID: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:4040/auth/github/callback",
//     passReqToCallback: true
//   },
//   function(req, accessToken, refreshToken, profile, done) {
//     console.log( "req", Object.keys(req))
//     console.log( "profile", profile)
//     // User.gitFindById(profile.id).then(function(value){
//     //   if(value){
//     //     console.log("already in database",value)
//     //   }
//     //   else{
//     //     console.log("now it is in database",profile.id)
//     //     User.gitCreate(profile.id)
//     //   }
//     // })





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
function addFacebookUser(user,token) {
	console.log('USER',user, token)
	//check if user exists.  Via email.  If not, make new, is yes, update existing
	return knex.select().from('users').where({username:user.emails[0].value}).then(function(existingUser){
		if(existingUser.length>0){
			//update user
			return knex('users').where({username:user.emails[0].value}).update({
				facebookID:user.id,
				facebookToken:token,
				facebookEmail:user.emails[0].value})

		}
		else{
			return knex('users').insert({
				facebookID:user.id,
				facebookToken:token,
				facebookEmail:user.emails[0].value
			})
			//create new user
		}
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