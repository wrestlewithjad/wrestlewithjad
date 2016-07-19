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

var moreConfig = require('./knexfile.js')
var env = 'production'
var knex = require('knex')(moreConfig[env])
knex.migrate.latest([moreConfig]);

var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

require('./passport')(passport);


app.use(session({						//Passport needs to piggyback off of express sessions so start an express session here.
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());



app.get('/', function(req, res) {   					// this gives the frontend our starter page.
	res.sendFile(__dirname + '/public/client/index.html')
})


app.get('/LoggedIn', function(req, res) {  //this tests to see if the user is logged in.  Tell front end the result
	if (req.isAuthenticated()) {
		res.send(req.sessionID);
	} else {
		res.send(false);
	}

})

app.get('/facebookReturn', function(req, res) {  //This is what gets called after our server finds out that facebook said it was a good user.
		res.sendFile(__dirname + '/public/client/index.html')  //It returns the splash page.
	})
	
app.post('/review', function(req, res) {  //This is what is called when you ask for reviews on the front end.

		if (req.isAuthenticated()) {  //Check if user is authenticated.  This is a property added to the request via passport.
			//grab the user id so you can deposit review in correct table
			//send in restaurant and airport id too.
			var restaurant = req.body.restaurant //THESE ARE EXPECTING NUMBERS (IDs), NOT WORDS
			var airport = req.body.airport 
			var score = req.body.score
			knex.select().from('userAirportJoin').where({  //this database has user ID, airport ID, res ID, and user score for that restaurant
				user_id: req.user.userID,  //this where statement is checking if the user has a review for that restaurant or not.
				restaurant_id: restaurant,
				airport_id: airport
			}).then(function(value) {  //this will either return [] if user doesn't have a review, or the user object if it does exist.
				var newValue;
				if (value.length === 0) {  //if the user doesn't have a review
					newValue = {
						user_id: req.user.userID,  //make a new value that has all the user info, plus a null oldScore.
						restaurant_id: restaurant,
						airport_id: airport,
						userScore: score,
						oldScore: null
					}
					return knex('userAirportJoin').insert({  //insert into the previous table a user ID, res ID, airport ID, and score.
						user_id: req.user.userID,
						restaurant_id: restaurant,
						airport_id: airport,
						userScore: score 
					}).return(newValue)  //then return that value you created on line 75.
				} else {
					newValue = {  //IF there is already a user in the table...
							user_id: req.user.userID,  //make a new value with all the user info, plus the old score being the current score in the database.
							restaurant_id: restaurant,
							airport_id: airport,
							userScore: score,  //the table's userScore is what it was previously, this userScore is what was passed in with the call.
							oldScore: value[0].userScore
						}
						//console.log('NEW',newValue)
					return knex('userAirportJoin').where({  //have Knex update the table so that the userscore is the new user score.
						user_id: req.user.userID,
						restaurant_id: restaurant,
						airport_id: airport
					}).update({
						userScore: score
					}).return(newValue)  //return that user value you created on line 89.
				}
			}).then(function(yourValue) { //yourValue is the newValue that you created on line 75 or line 89.
				knex('airportRestaurants').select().where({  //look into your table that looks at restaurants at airports and average reviews.
					airport_id: airport,  //grab everything from the restaurant that was passed in.
					restaurant_id: restaurant
				}).then(function(selected) {  //then take that value...
					if (selected[0].averageReview) {  //if that restaurant has an average review
						var newAverage;
						if (yourValue.oldScore) {  //if that user object has an oldScore value.
							newAverage = (Number(selected[0].averageReview) * Number(selected[0].reviewerTotal) + Number(yourValue.userScore) - Number(yourValue.oldScore)) / Number((selected[0].reviewerTotal))  //use math to make a new average
							knex('airportRestaurants').returning(['averageReview', 'reviewerTotal']).where({  //go into the airportsRestaurants database
								airport_id: airport,		
								restaurant_id: restaurant
							}).update({							//update the average review with your new average
								averageReview: newAverage
							}).then(function(value) {  //after you update the restaurant object
								grabRestaurants(req.body.airportName, req.user.userID, true).then(function(response) {  //grab all the restaurants
									res.send(response);  //send an array of all the restaurants.
								});
							})
						} else {  //if the restaurant doesn't have an old score.
							newAverage = (Number(selected[0].averageReview) * Number(selected[0].reviewerTotal) + Number(yourValue.userScore)) / Number((selected[0].reviewerTotal) + 1)  //make a new average
							newTotal = Number(selected[0].reviewerTotal + 1);  //make a variable that will store the increased amount of user reviews
							knex('airportRestaurants').returning(["averageReview", "reviewerTotal"]).where({ //open up the table
								airport_id: airport,
								restaurant_id: restaurant
							}).update({  					//and update the average review and total number of reviews for the restaurant
								averageReview: newAverage,
								reviewerTotal: newTotal
							}).then(function(value) {  //After you update it, grab all the restaurants
								grabRestaurants(req.body.airportName, req.user.userID, true).then(function(response) {
									res.send(response);  //send an array of all the restaurants
								});
							})
						}
					} else {  //if the restaurant doesn't have an average review.
						knex('airportRestaurants').where({  //go into the airportsRestaurant table
							airport_id: airport,
							restaurant_id: restaurant
						}).update({							// update the restaurant with the user's score, and the review total being 1.
							averageReview: yourValue.userScore,
							reviewerTotal: 1
						}).then(function(value) {					//After you update the table
							grabRestaurants(req.body.airportName, req.user.userID, true).then(function(response) {  //grab all the restaurants
								res.send(response);  		//send back the restaurants
							});
						})
					}
				})

			})
		} else {  				//If the user isn't authenticated
			res.sendStatus(403)  //They shouldn't be able to review!
		}

	})
var findByUserName = function(myName) {			//this is a function that takes a username
	return knex.select('username', 'password').from('users').where({
		username: myName
	}).then(function(value) {
		if (value.length > 0) {			//if the user is in the table
			return value[0];		//return the user object
		}
		return false;				//else return false
	})
}

app.post('/signup', passport.authenticate('local-signup'), function(req, res) {	//This gets called when the frontend wants to sign up.  uses passport middlewear
	if (req.body.city.length > 0) {					//if you are signing in while ALREADY looking at the restaurant list.
		grabRestaurants(req.body.city).then(function(response) {	//grab all the restaurants
			res.send({						//send back your sessionID and the restaurants.
				sessionID: req.sessionID,
				yourReviews: response
			})
		})

	} else {
		res.send({
			sessionID: req.sessionID			//If you are still on the splash page, just send back the sessionID.
		})
	}

})

app.post('/logIn', passport.authenticate('local-login'), function(req, res) {	//This is when you want to log in.  Uses passport middlewear.
	if (req.body.city.length > 0) {		//If you are ALREADY looking at the restaurant list.
		grabRestaurants(req.body.city, req.user.userID, true).then(function(response) {	//grab the restaurants and pass in your user ID to get your reviews.
			res.send({					//send back the session ID and the restaurant list.
				sessionID: req.sessionID,
				yourReviews: response
			})
		})
	} else {
		res.send({				//If still looking at the splash page, send back just the session ID.
			sessionID: req.sessionID
		})
	}
})
app.post('/logOff', function(req, res) {		//If the user wants to log off
	req.logout();			//log off
	req.session.destroy();		//sometimes log off doesn't work, so destroy that session.
	res.send("logged Out")		//Let user know they are logged off.
})
app.get('/facebookLogin', passport.authenticate('facebook', {		//If you want to log in via facebook.  Uses passport middlewear
	scope: ['email']		//Make sure facebook gives you back an email.  It doesn't by default.
}));
app.get('/facebookLogin/Callback', passport.authenticate('facebook', {		//This is what facebook calls when it finishes authenticating the user.
	successRedirect: '/facebookReturn',			//If good, go to facebookReturn
	failureRedirect: '/'						//else you go back to default
}))



app.get('/restaurantList', function(req, res) {  //if the front end wants the restaurants
	var city = req.query.city;		//this is the city
	var user;
	var isAuth;
	if (req.user)			//if the user is already logged in.
		user = req.user.userID;		//save the user ID
	else
		user = "";					//else say it's blank
	if (req.isAuthenticated())	//if the user is authenticated
		isAuth = true;			//save true
	else
		isAuth = false;			//else save false

	grabRestaurants(city, user, isAuth).then(function(response) {		//grab the restaurants at the airport.
		res.send(response);		//send back the response.
	});



})

var grabRestaurants = function(city, user, auth) {		//The function grabs all the restaurants and any reviews the user has.
	return knex.select().from('airports').where({  //look into the airports table
		'AIRPORT_CITY': city				//grab the specific airport
	}).then(function(airportValues) {				
		if (airportValues.length == 0) {			//If that airport doesn't exist
			return null									//return null
		} else {										//if the airport does exist
			return knex.select().from('maps').where({		//go to the maps database
				airport_id: airportValues[0].UNIQUE_ID		//grab the maps for the airport
			}).then(function(maps) {		
				return knex('airportRestaurants').join('restaurants', 'restaurant_id', '=', 'restaurants.UNIQUE_ID').select().where({	//go to this table and join it with the restaurants table
						airport_id: airportValues[0].UNIQUE_ID	//grab everything from your specific airport
					})
					.then(function(value) {		//You now have all the joined table for the specific airport
						if (auth) {				//if you are authorized
							return knex.select().from('userAirportJoin').where({		//go into the userAirport table
								user_id: user,											//grab everything for the specific user and airport
								airport_id: airportValues[0]['UNIQUE_ID']			
							}).then(function(userValues) {								//Then with this new list of user reviews
								for (var i = 0; i < value.length; i++) {				//go through all of your joined values from line 251
									for (var j = 0; j < userValues.length; j++) {		//and go through all of your reviews
										if (value[i].restaurant_id === userValues[j].restaurant_id) {		//if a review matches a restaurant
											for (var key in userValues[j]) {			//grab every key in the review
												value[i][key] = userValues[j][key]		//and add it to your joined table at that specific value
											}
											break;			//since you can only have one match for each specific review, if you find one, jump out of the inner loop.
										}
									}
								}
								return [value, maps]		//return all of your restaurants with reviews AND your maps

							})
						} else {
							return [value, maps]			//return all of your restaurants sans reviews AND your maps.
						}
					})
			})
		}


	})

}



var port = process.env.PORT || 4040;			
app.listen(port);
console.log("Listening on port " + port);