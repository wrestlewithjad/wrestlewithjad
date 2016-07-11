var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config.js');

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var bcrypt = require('bcrypt-nodejs');
var uuid = require('node-uuid');
cors = require('cors')
var app = express();
module.exports = app;
app.use(cors());
app.use(bodyParser.json());
const compiler = webpack(config);
app.use(express.static(__dirname + '/public'));
app.use(webpackMiddleware(compiler));
var knex = require('knex')({
	client: 'sqlite3',
	connection: {
		filename: './airports.sqlite3'
	},
	migrations: {
		tableName: 'airports'
	}
});

var passport = require('passport');
//var GitHubStrategy = require('passport-github2').Strategy;
var session = require('express-session');
var LocalStrategy   = require('passport-local').Strategy;
//console.log('LS',LocalStrategy)
var GITHUB_CLIENT_ID = "6b4078dcd8c8aae79a63";
var GITHUB_CLIENT_SECRET = "7319b8f69f730102c7cc6d7979363ee63f007d44";
//require('./app/routes.js')(app, passport);
require('./passport')(passport);


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


app.use(passport.initialize());
app.use(passport.session());




app.get('/', function(req, res) {
	//console.log("req",req)
	//console.log("authentic",req.isAuthenticated())
	//res.send(req) //the req passes in a session id.
	res.sendFile(__dirname + '/public/client/index.html')
})


app.get('/LoggedIn',function(req,res){
	if(req.isAuthenticated()){
		res.send(req.sessionID);
	}else{
		res.send(false);
	}
	
})

app.get('/review', function(req,res) {
	//console.log("authentic",req.isAuthenticated)
	res.send("he he")
	})
	//Get all reviews for the airport.  Make middlewear to check if the user is signed in and if he is, show that user's reviews
app.post('/review', function() {

	})
	//add the review to the restaurant at that airport.


var findByUserName = function(myName) {
	return knex.select('username', 'password').from('users').where({
		username: myName
	}).then(function(value) {
		//console.log('value',value)
		if (value.length > 0) {
			return value[0];
		}
		return false;
	})
}



// function getSessionID(userId){
// 	 var id = uuid.v4();
//    console.log("id",id)
//    console.log("uid",userId)
//    // return db('sessions').returning(['id']).insert({ id: id, user_id: userId }).then(function(here){
//    //   return id
//    // })
// }


app.post('/signup',passport.authenticate('local-signup'),function(req,res){
	console.log('req',req.session.passport.user)
	//console.log('res',req)
	//insert sessionID into database
	res.send(req.sessionID)
	
})
app.post('/logIn', passport.authenticate('local-login'),function(req,res) {
	var username = req.body.username;
	var password = req.body.password;
	// findByUserName(username).then(function(value) {
	// 		checkPassword(password, value.password)
	// 			//check password
	// 	})
		//find by username in the username table.
		res.send(req.sessionID)
	//check if user credentials are good
})
app.post('/logOff',function(req,res){
	req.logout();
	req.session.destroy();
	res.send("logged Out")
})


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


//     // asynchronous verification, for effect...
//     process.nextTick(function () {

//       //look up more user info (likes, etc) via database
//       //



//       // To keep the example simple, the user's GitHub profile is returned to
//       // represent the logged-in user.  In a typical application, you would want
//       // to associate the GitHub account with a user record in your database,
//       // and return that user instead.
//       return done(null, profile);
//     });
//   }
// ));
//app.options('/auth/github', cors());
// app.get('/auth/github',
//   passport.authenticate('github', { scope: [ 'user:email' ] }),
//   function(req, res){
//     // The request will be redirected to GitHub for authentication, so this
//     // function will not be called.
//   });

// // GET /auth/github/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function will be called,
// //   which, in this example, will redirect the user to the home page.
// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/review' }),
//   function(req, res) {
//     console.log("auth",req.isAuthenticated())

//     res.send('hey now!')
//   });





var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);