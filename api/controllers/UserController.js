/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {	
	
	signup: function(req,res) {		
		var userData = {
			userName: req.param('userName'),
			email: req.param('email'),
			password: req.param('password')
		};	
		
		User.create(userData).exec(function(err,user){
			if(err) {
				return res.serverError(err);
			} else {				
				return res.redirect('/');					
			}
		}); 	
	},

	signin: function(req,res) {
		var userData = {
			userName: req.param('userName'),
			password: req.param('password')
		};
	
		User.findOne(userData).exec(function(err,user) {
			if(err){
				return res.serverError(err);
			} else if(user){			
				req.session.userId = user.id;					
				req.session.userName = user.userName;									
				return res.redirect('/'+user.userName+'/projects');		
			}
		});			
	},

	signout: function(req, res) {
      	req.session.destroy(function(err) {
           res.redirect('/');
      	});
	}
};

