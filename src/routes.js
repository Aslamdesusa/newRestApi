var UserModel = require('../models/user');
var Joi = require('joi');

const routes = [
	{
		method: 'GET',
		path: '/api/user',
		config: {
			tags: ['api'],
			descripition: 'get all user data',
			notes: 'get all user data'
		},
		handler: function (request, reply){
			UserModel.find({}, function(error, data) {
				if (error){
					reply({
						message: 'Faild to get data',
						data: error
					});
				}else{
					reply({
						message: 'User Data Successfully Fetched',
                    	data: data
					});
				}
			})
		}
	}
]