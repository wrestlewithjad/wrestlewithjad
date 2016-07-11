module.exports = function(app, passport) {   
	app.post('/signup',passport.authenticate('local-login'),function(req,res){
	//console.log('req',req)
	//console.log('res',res)
	res.send()
})
}