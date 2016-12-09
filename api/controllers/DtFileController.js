/**
 * DtFileController
 *
 * @description :: Server-side logic for managing dtfiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jsonFile = require('jsonfile');

module.exports = {
	
	create: function(req,res) {

		var userData = {
			userName: req.param('userName')
		};	
	
		var projectData = {
			projectId: req.param('projectId')
		};

		var fileData = {
			fileName: req.param('fileName')
		};

		var userId = req.session.userId;		

		if (userData.userName == req.session.userName){

			async.series([

				function checkUser(callback) {
					
					User.findOne({userName: userData.userName}).exec(function(err,users){
						if(err){
							callback(err);
						} else if (users) {
							projectData.user = users.id;
							callback();
						} 
					});
				},

				function checkProject(callback) {
					
					Project.findOne({id: projectData.projectId}).exec(function(err,projects){				
						if (err) {
							callback(err);
						} else if (projects) {
							fileData.project = projects.id;
							projectData.projectName = projects.projectName;
							callback();
						}
					});	
				},

				function createDtFile(callback){
					var fileDir = process.cwd()+'\\projects\\' + userData.userName +'\\'+ projectData.projectName + '\\' + fileData.fileName + '.json' ;		
					fileData.url = fileDir ;
					console.log("File Url = " + fileDir);
					var obj = {

						dtData:{
							names:{
								conditions : [""],
								actions : [""]
							},

							rules:[
								{
									conditions : [""],
									actions : [""]
								},		       
							]
						}
					}

					jsonFile.writeFile(fileDir, obj, function(err){

						if(err){
							callback(err);
						} else {
							DtFile.create(fileData).exec(function(err,newDtfileData){
								if(err){
									callback(err);
								} else {								
									sails.sockets.broadcast("socketProjectRoom", 'newFile', newDtfileData);
									return res.ok(newDtfileData);								
								}
							}); 
						}
					});				
				}
			],
			function(err) {
        		return res.serverError(err);
			})
		} else {
			return res.redirect('/');
		}
	},	

	getAllFiles: function(req,res){

		var userData = {
			userName: req.param('userName')
		};
		var projData = {
			projectId: req.param('projectId')
		};

		if (userData.userName == req.session.userName) {

			async.series([

				function findUser(callback) {
					console.log("userName = " + userData.userName);
					User.findOne({userName: userData.userName}).exec(function(err,users){
						if(err){
							callback(err);
						} else if (users) {
							projData.user = users.id;
							callback();
						} 
					});
				},

				function findProject(callback) {
					
					var userId = req.session.userId;

					Project.findOne({user: userId}).exec(function(err, projects) {					
						if (err) {
							callback(err);
						} else if (projects) {
							DtFile.project = projects.id;
							callback();
						}
					});	
				},

				function findDtFile(callback){
					
					DtFile.find({project: projData.projectId}).exec(function(err,files){
						if(err) {
							callback(err);
						} else if (files){
							DtFileService.fileDirectory[projData.projectId] = files;
									
							var fileName = files.map(function(file){
            					return file.fileName;
							});
							console.log("----FileDatas------" + fileName);
;
							return res.view('dtTable', {filesList : files, projectId: projData.projectId, userName: userData.userName});

						}
					});
				}
			],
			function(err) {
        		return res.serverError(err);
			})	
		} 	
	},

	socketJoin: function(req,res){
		if (!req.isSocket) {
			return res.badRequest();
		}

		var userName = req.session.userName;
		var userId = req.session.userId;
		
		sails.sockets.join(req,"socketProjectRoom");

		var socketId = sails.sockets.getId(req);
		console.log("file join socketsID = " + socketId);
		
		return res.json(socketId);
	}
};