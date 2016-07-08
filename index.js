var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('./webpack.config.js');

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var bcrypt = require('bcrypt-nodejs');

var app = express();
module.exports = app;

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

app.post('/signUp', function(req,res) {
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

var checkPassword = function(password, storedPassword) {
	//need to do hashing of password here
	console.log("pass", password, storedPassword)
	if (password === storedPassword)
		return true;
	return false;

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
var userName = "phil"
var password = 'test2';
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

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);