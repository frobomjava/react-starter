/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/*indexCheck: function(req,res){
		var userName = req.param('userName');
		if (userName == req.session.userName) {			
			res.view('projects', {'userName' : userName});
		} else {
			console.log('homepage');
			res.view('home');
		}
	},	*/

	create: function(req,res) {
		
		var userName = req.param('userName');
	
		var newProjectData = req.params.all();	

		var userId = req.session.userId;		

		if (userName == req.session.userName){

			var filesSystem = require('fs');

			var dir = process.cwd()+'\\projects';

			if (!filesSystem.existsSync(dir)) {

				filesSystem.mkdirSync(dir);

			}

			var userDir = process.cwd()+'\\projects\\'+userName;

			if (!filesSystem.existsSync(userDir)) {

				filesSystem.mkdirSync(userDir);	
				
			}

			var projectDir = process.cwd()+'\\projects\\' + userName +'\\'+ newProjectData.projectName;			

			if (!filesSystem.existsSync(projectDir)) {				

				filesSystem.mkdirSync(projectDir);

				User.findOne(userId).exec(function(err,user) {

					if(err){	

						return res.serverError(err);

					} else if(user) {

						var pName = newProjectData.projectName;					

						Project.create({
						projectName: pName,
						user: user,
						url: projectDir}).exec(function(err,newProject){
							if(err){
								return res.serverError(err);
							} else {								
								sails.sockets.broadcast('socketRoom', 'newProject', newProject);
								return res.ok(newProject);								
							}
						});

					}
				});
			}
		} else {
			return res.redirect('/');
		}
	},	

	getAllProjects: function(req,res){

		var userName = req.param('userName');

		if (userName == req.session.userName) {

			var userId = req.session.userId;

			Project.find({user: userId}).sort('projectName ASC').exec(function(err, projects) {					
				if (err) {
					return res.serverError(err);
				} else if (projects) {
					ProjectService.projectDirectory[userId] = projects;									
					/*var projectsName = projects.map(function(project){
						return project.projectName;
					});*/				
					return res.view('projects', {projectsList : projects , 'userName' : req.session.userName});					
				}
			});					
		} else {
			return res.redirect('/');	
		}		
	},

	socketJoin: function(req,res){
		if (!req.isSocket) {
			return res.badRequest();
		}

		var userName = req.session.userName;
		var userId = req.session.userId;

		sails.sockets.join(req,'socketRoom');

		var socketId = sails.sockets.getId(req);
		console.log("socketsID = " + socketId);
		
		return res.json(socketId);
	}
};