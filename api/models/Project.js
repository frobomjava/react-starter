module.exports = {

 	attributes: {
 		projectName: {
 			type: 'string',
 			required: true
 		},
 		url: {
 			type: 'string'
 		},
 		user:{
 			model: 'user'
 		}
 	}
 };

