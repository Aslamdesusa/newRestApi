import Hapi from 'hapi';	
var inert = require('inert');
const vision = require('vision');

var server = new Hapi.Server();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restdemo');

import routes from './routes'

server.connection({
	port: 8080 
});

server.register([
	inert,
	vision,
	{
		register:require('hapi-swagger')
	}],function(err){
		 if (err) {
	        server.log(['error'], 'hapi-swagger load error: ' + err)
	    } else {
	        server.log(['start'], 'hapi-swagger interface loaded')
	    }
	});

server.route(routes)

server.start(err =>{
	if(err){
		console.log(err);
	}
})
