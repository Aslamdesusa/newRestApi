var UserModel = require('../models/user');
var Joi = require('joi');

const routes = [
	{
		method:'GET',
		path:'/api/user',
		config: {
			// Include this API in swagger documentation
	        tags: ['api'],
	        description: 'Get All User data',
	        notes: 'Get All User data'
		},
		handler: function(request, reply){
			//getting all data using mongodb user collection
			UserModel.find({}, function(err, data){
				if (err){
					reply({
	                    statusCode: 503,
	                    message: 'Failed to get data',
	                    data: error
	                });
				} else{
					reply({
	                    statusCode: 200,
	                    message: 'User Data Successfully Fetched',
	                    data: data
	                });
				}
			});
		}
	},
	{
		method:'POST',
		path:'/api/user',
		config:{
			//tags enable swagger to document api
			tags:['api'],
			description:"save user data",
			notes:"save user data",
			//we joi plugin to validate request
			validate:{
				payload:{
					name:Joi.string().required(),
					age:Joi.number().required()
				}
			}
		},
		handler: function(request, reply){
			// Create mongodb user object to save it into database
			var user = new UserModel(request.payload);

			 user.save(function (error) {
	            if (error) {
	                reply({
	                    statusCode: 503,
	                    message: error
	                });
	            } else {
	                reply({
	                    statusCode: 201,
	                    message: 'User Saved Successfully'
	                });
	            }
	        });
		}
	},
	//fatching all user data
	{
		method: 'GET',
		// getting data for particular user
		path: '/api/user/{id}',
		config: {
			tags: ['api'],
			description: 'Get specific user data',
			notes: 'Get specific user data',
			validate: {
				//id is required field
				params: {
					id: Joi.string().required()
				}
			}
		},
		handler: function (request, reply) {
			//finding user for particular userid
			UserModel.find({_id: request.params.id}, function (error, data) {
				if(error){
					reply({
						statusCode: 503,
						message: 'Failed to get data',
						data: error
					});
				}else{
					reply({
						statusCode: 200,
						message: 'User Data Successfully Fetched',
						data: data
					});
				}
			})
		}
	},
	{
		method: 'PUT',
    	path: '/api/user/{id}',
    	config: {
    	// Swagger documentation fields tags, description, note
    	tags: ['api'],
        description: 'Update specific user data',
        notes: 'Update specific user data',

        // Joi api validation
        validate: {
            params: {
                //`id` is required field and can only accept string data
                id: Joi.string().required()
            },
            payload: {
                name: Joi.string(),
                age: Joi.number()
            }
        }
    },
		handler: function(request, reply) {
			// `findOneAndUpdate` is a mongoose modal methods to update a particular recored
			UserModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
				if(error){
					reply({
						statusCode: 503,
						message: 'Failed to get data',
						data: error
					});
				}else{
					reply({
						statusCode: 200,
						message: 'User Update Successfully',
						data: data
					});
				}
			});
		}
	},
	{
		method: 'DELETE',
	    path: '/api/user/{id}',
	    config: {
	        tags: ['api'],
	        description: 'Remove specific user data',
	        notes: 'Remove specific user data',
	        validate: {
	            params: {
	                id: Joi.string().required()
	            }
	        }
	    },
	    handler: function (request, reply) {
	    	//`findOneAndRemove` is a mongoose methods to remove a particular recore into database.
	    	UserModel.findOneAndRemove({_id: request.params.id}, function (error)  {
	    		if(error){
	    			reply({
	    				statusCode: 503,
	    				message: 'Error in removing User',
	    				data: error
	    			});
	    		}else{
	    			reply({
	    				statusCode: 200,
	    				message: 'User Deleted Successfully'
	    			});
	    		}
	    	});
	    }
	}
]
export default routes;
