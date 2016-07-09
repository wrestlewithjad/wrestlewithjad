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
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/client/index.html')
})

app.post('/signIn', function() {
	var username = req.body.username;
	var password = req.body.password;
	findByUserName(username).then(function(value) {
			checkPassword(password, value.password)
				//check password
		})
		//find by username in the username table.

	//check if user credentials are good
})

app.post('/signup', function(req,res) {
	console.log("yooooo")
	getSessionID('tony')
	res.send("heyyyyy")
	//check if user is already in database.  If not, add to DB and log in.

})
app.get('/review', function() {

	})
	//Get all reviews for the airport.  Make middlewear to check if the user is signed in and if he is, show that user's reviews
app.post('/review', function() {

	})
	//add the review to the restaurant at that airport.

function addUser(userName, password) {
	return hashPassword(password)
		.then(function(hashWord) {
			return knex('users').insert({
				username: userName,
				password: hashWord
			})
		})
}

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



function hashPassword(password) {

	return new Promise(function(resolve, reject) {

		bcrypt.hash(password, null, null, function(err, hash) {
			if (err) reject(err)
			else resolve(hash)
		});
	})
};

function comparePassword(passwordHashFromDatabase, attemptedPassword) {
	console.log("hhhhhh")
	return new Promise(function(resolve, reject) {

		bcrypt.compare(attemptedPassword, passwordHashFromDatabase, function(err, res) {
			if (err) reject(err)
			else resolve(res)
		});
	})
};

function getSessionID(userId){
	 var id = uuid.v4();
   console.log("id",id)
   console.log("uid",userId)
   // return db('sessions').returning(['id']).insert({ id: id, user_id: userId }).then(function(here){
   //   return id
   // })

}

var userName = "phil"
var password = 'test32';
var magic = findByUserName(userName).then(function(value) {
	if(!value){
		addUser(userName,password).then(function(newValue){
			console.log("info",newValue);
		})
	}
	else{
		console.log("userName already taken")

	}
	comparePassword(value.password, password).then(function(value){
		console.log("value",value)
	}).catch(function(err){
		console.log("err",err)
	})
	
	console.log("magic", value)
})

// knex('users').insert({username:'chuck',password:'test'}).then(function(value){
// 	console.log("val",value)
// })
// knex('restaurants').insert({restaurantName:'Pizza Hut',terminal: "B",foodType:'pizza',restaurantPicture:'No pic',isSitDown:true,price:1}).then(function(val){

// knex('airports').insert({airportName:'Houston',airportMap:'No Map!'}).then(function(val){
// // knex('airportRestaurants').insert({airport_id:3,restaurant_id:1}).then(function(val){
// // 	knex.select().from('airports').then(function(value){
// // 	console.log("value",value)
// // })	
//  })

// 	//console.log('val',val)

// })

//GIT HUB PASSPORT STUFF
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var session = require('express-session');

var GITHUB_CLIENT_ID = "6b4078dcd8c8aae79a63";
var GITHUB_CLIENT_SECRET = "7319b8f69f730102c7cc6d7979363ee63f007d44";

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:4040/auth/github/callback",
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    console.log( "req", Object.keys(req))
    console.log( "profile", profile)
    // User.gitFindById(profile.id).then(function(value){
    //   if(value){
    //     console.log("already in database",value)
    //   }
    //   else{
    //     console.log("now it is in database",profile.id)
    //     User.gitCreate(profile.id)
    //   }
    // })


    // asynchronous verification, for effect...
    process.nextTick(function () {

      //look up more user info (likes, etc) via database
      //



      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));
app.options('/auth/github', cors());
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/review' }),
  function(req, res) {
    console.log("auth",req.isAuthenticated())

    res.send('hey now!')
  });





var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);