var LocalStrategy   = require('passport-local').Strategy;

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

passport.deserializeUser(function(obj, done) {
  
	console.log("DU",obj,done)
  done(null, obj);
});



passport.use('local-signup',new LocalStrategy(
	function(username,password,callback){
	console.log("ARGH",callback)
	//console.log("")
	process.nextTick(function(){
		//email = "hello"

		knex.select('username').from('users').where({username:username}).then(function(value){ //find a user in table with correct email
			console.log("userValue",value)
			if(value.length>0){
				return callback(null,false);  //This sends back a 401 error.
				//return callback(null,false,req.flash('signupMessage', 'That email is already taken.'))
			}
			return callback(null,username)
		})
	})
}))




}