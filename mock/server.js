'use strict';

var restify = require('restify');
var resourceMixin = require('./utils/resourceMixin');
var security = require('./security');

var server = restify.createServer({
	name: 'mock-server',
	version: '1.0.0'
});

resourceMixin(server);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.CORS());
server.pre(restify.pre.sanitizePath());
server.pre(function(req, res, next) {
	res.charSet('utf-8');
	res.cache({
		maxAge: 0
	});
	next();
});
server.pre(security.preFilter);

server.post('/login', security.login);
server.post('/logout', security.logout);
server.post('/clients', security.createClient);
server.del('/clients/:id', security.removeClient);

require('./routers')(server);

server.listen(5050, function() {
	console.log('Mock server listening at %s', server.url);
});