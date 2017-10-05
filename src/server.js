var Hapi = require('hapi');
var intert = require('inert');
const Vision = require('vision');

import routes from './routes'


var server = new Hapi.Server();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restdemo');


server.connection({
	port:8000
});

server.register([
	intert,
	Vision,
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

server.start(err => {
	if(err){
		console.log(err);
	}
})
