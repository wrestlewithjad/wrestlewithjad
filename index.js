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
var env = 'staging'
var knex = require('knex')(moreConfig[env])
knex.migrate.latest([moreConfig]);

var passport = require('passport');
var session = require('express-session');
var LocalStrategy   = require('passport-local').Strategy;

require('./passport')(passport);


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));


app.use(passport.initialize());
app.use(passport.session());




app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/client/index.html')
})


app.get('/LoggedIn',function(req,res){
	if(req.isAuthenticated()){
		res.send(req.sessionID);
	}else{
		res.send(false);
	}
	
})

app.get('/facebookReturn', function(req,res) {
	res.sendFile(__dirname + '/public/client/index.html')
	})
	//Get all reviews for the airport.  Make middlewear to check if the user is signed in and if he is, show that user's reviews
app.post('/review', function(req,res) {
	//req.user should have the user info.
	//req.body will have a score property and restaurant property.
	if(req.isAuthenticated()){
		//grab the user id so you can deposit review in correct table
		//send in restaurant and airport id too.
		var restaurant = req.body.restaurant  //THESE ARE EXPECTING NUMBERS, NOT WORDS
		var airport = req.body.airport  							//first seeing if the restaurant has been reviewed or not.  Then adding your review
		var score = req.body.score
		knex.select().from('userAirportJoin').where({user_id:req.user.userID,restaurant_id:restaurant,airport_id:airport}).then(function(value){
			var newValue;
			if(value.length===0){
				newValue = {user_id:req.user.userID,restaurant_id:restaurant,airport_id:airport,userScore:score, oldScore:null}
				return knex('userAirportJoin').insert({user_id:req.user.userID,restaurant_id:restaurant,airport_id:airport,userScore:score}).return(newValue)
			}
			else{
				newValue = {user_id:req.user.userID,restaurant_id:restaurant,airport_id:airport,userScore:score,oldScore:value[0].userScore}
				//console.log('NEW',newValue)
				return knex('userAirportJoin').where({user_id:req.user.userID,restaurant_id:restaurant,airport_id:airport}).update({userScore:score}).return(newValue)
			}
		}).then(function(yourValue){
			//console.log("YOURVALUE",yourValue)
			//update the review average and the number of reviewers
			knex('airportRestaurants').select().where({airport_id:airport,restaurant_id:restaurant}).then(function(selected){
				if(selected[0].averageReview){
					var newAverage;
					//console.log("SELECTED",selected)
					if(yourValue.oldScore){
						newAverage = (Number(selected[0].averageReview)*Number(selected[0].reviewerTotal)+Number(yourValue.userScore)-Number(yourValue.oldScore))/Number((selected[0].reviewerTotal))
						//console.log('NEWAVG',newAverage)
						knex('airportRestaurants').returning(['averageReview','reviewerTotal']).where({airport_id:airport,restaurant_id:restaurant}).update({averageReview:newAverage}).then(function(value){
							//console.log("THIS VALUE",value)
							//res.send(value)
							grabRestaurants(req.body.airportName,req.user.userID,true).then(function(response){
								//console.log("RESPONSE",response)
								res.send(response);
							});
						})
					}
					else{
						newAverage = (Number(selected[0].averageReview)*Number(selected[0].reviewerTotal)+Number(yourValue.userScore))/Number((selected[0].reviewerTotal)+1)
						//console.log("airportID",airport)
						newTotal = Number(selected[0].reviewerTotal+1);
						knex('airportRestaurants').returning(["averageReview","reviewerTotal"]).where({airport_id:airport,restaurant_id:restaurant}).update({averageReview:newAverage,reviewerTotal:newTotal}).then(function(value){
							//console.log("DOES THIS WORK?",value);
							//res.send(value)
							grabRestaurants(req.body.airportName,req.user.userID,true).then(function(response){
								res.send(response);
							});
						})
					}
				
				//res.send('YAHOO')
				}
				else{
					knex('airportRestaurants').where({airport_id:airport,restaurant_id:restaurant}).update({averageReview:yourValue.userScore,reviewerTotal:1}).then(function(value){
							grabRestaurants(req.body.airportName,req.user.userID,true).then(function(response){
								res.send(response);
							});
						})
				}
			})
			
		})
	}
	else{
		res.sendStatus(403)	
	}
	
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
	if(req.body.city.length>0){
		grabRestaurants(req.body.city).then(function(response){
			res.send({sessionID:req.sessionID,yourReviews:response})
		})
		
	}
	else{
		res.send({sessionID:req.sessionID})
	}
	
})

app.post('/logIn', passport.authenticate('local-login'),function(req,res) {

	var username = req.body.username;
	var password = req.body.password;

	if(req.body.city.length>0){
 		grabRestaurants(req.body.city,req.user.userID,true).then(function(response){
 			res.send({sessionID:req.sessionID,yourReviews:response})
 		})
	}else{
	res.send({sessionID:req.sessionID})
	}
	//check if user credentials are good

})
app.post('/logOff',function(req,res){
	//console.log()
	req.logout();
	req.session.destroy();
	res.send("logged Out")
})
app.get('/facebookLogin',passport.authenticate('facebook', {scope:['email']}));
app.get('/facebookLogin/Callback',passport.authenticate('facebook',{successRedirect:'/facebookReturn',failureRedirect:'/'}))




app.get('/restaurantList',function(req,res){
	var city = req.query.city;
	var user;
	var isAuth;
	if(req.user)
		user = req.user.userID;
	else
		user = "";
	if(req.isAuthenticated())
		isAuth =true;
	else
		isAuth =false;
	console.log("isAuth",isAuth)

	grabRestaurants(city,user,isAuth).then(function(response){
		res.send(response);
	});

	

})

var grabRestaurants = function(city,user,auth){

	//console.log("CITY",city, "HERE",Number(city))
	return knex.select().from('airports').where({'AIRPORT_CITY':city}).then(function(airportValues){
		console.log("AIRPORT VALUES",airportValues)
		if(airportValues.length ==0){
			console.log("HERE I AM")
			return null
		}
		else{
			//console.log("APV",airportValues[0].)
	return knex.select().from('maps').where({airport_id:airportValues[0].UNIQUE_ID}).then(function(maps){
		console.log("MAPS",maps)
		return knex('airportRestaurants').join('restaurants','restaurant_id','=','restaurants.UNIQUE_ID').select().where({airport_id:airportValues[0].UNIQUE_ID})
		.then(function(value){
			if(auth){
			return knex.select().from('userAirportJoin').where({user_id:user,airport_id:airportValues[0]['UNIQUE_ID']}).then(function(userValues){
				for(var i=0;i<value.length;i++){
					for(var j =0;j<userValues.length;j++){
						//console.log("VR",value[i],"UR",userValues[j])
						if(value[i].restaurant_id===userValues[j].restaurant_id){
							for(var key in userValues[j]){
								//console.log("HERE")
								value[i][key] = userValues[j][key]
							}
							break;
						}
					}
				}
				return [value,maps]

			})
			}	
			else{
				return [value,maps]
				//res.send(value)
			}
		})
	})
	}


	})

}




var port = process.env.PORT || 4040;
app.listen(port,'0.0.0.0');
console.log("Listening on port " + port);