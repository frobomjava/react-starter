/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index: function(req,res){
		var userName = req.param('userName');
		if (userName == req.session.userName) {			
			res.view('newProject', {'userName' : userName});
		} else {
			console.log('homepage');
			res.view('home');
		}
	},	

	create: function(req,res) {
		var userName = req.param('userName');
	
		var newProjectData = req.params.all();		

		var filessystem = require('fs');

		var dir = process.cwd()+'\\projects';

		if (!filessystem.existsSync(dir)) {

			filessystem.mkdirSync(dir);
		}

		var userDir = process.cwd()+'\\projects\\'+userName;

		if (!filessystem.existsSync(userDir)) {

			filessystem.mkdirSync(userDir);					
		}

		var projectDir = process.cwd()+'\\projects\\' + userName +'\\'+ newProjectData.projectName;			

		if (!filessystem.existsSync(projectDir)) {

		filessystem.mkdirSync(projectDir);	

		var userId = req.session.userId;		

			User.findOne(userId).exec(function(err,user) {

			if(err){
				return res.serverError(err);
			} else if(user){				
				Project.create({
				projectName: newProjectData.projectName,
				user: user,
				url: projectDir}).exec(function(err,newProjectData){
					if(err){
						return res.serverError(err);
						} else {
						console.log(newProjectData);
							//Project.publishCreate({id:newProjectData.id, projectName:newProjectData.projectName});
							return res.redirect('/'+ userName +'/projects');		
						}
					});	
				}
			});	

		} else {
			return res.send(500, { error: 'project already exists' });
		}					
	},	

	getAllProjects: function(req,res){

		var userName = req.param('userName');

		if (userName == req.session.userName) {
			if(req.isSocket){
			var pUser = req.session.userId;			
			/*Project.find(userId).exec(function(err, project){
        		if (err) {
					return res.serverError(err);
				} else if (project) {				
					var pUser = userId;						
					if (ProjectService.projectDirectory.hasOwnProperty(pUser)) {								
						return res.view('projects', {projectLists : ProjectService.projectDirectory[pUser], userName : req.session.userName});
					}*/
					Project.find({user: pUser}).sort('id ASC').exec(function(err, projects) {					
						if (err) {
							return res.serverError(err);
						} else if (projects) {
							ProjectService.projectDirectory[pUser] = projects;									
							var projectsName = projects.map(function(project){
        						return project.projectName;
							});								
							console.log(projects);							
							return res.send(projects);
						} else {
							res.serverError(err);
						}
					});
				/*} else {
					res.serverError(err);
				}*/
			/*});*/
			}else{
				console.log('no socket');
				var userName = req.session.userName;
				res.view('Projects', {'userName' : userName});
			}			
		} else {
			res.view('home');
		}		
	}
};