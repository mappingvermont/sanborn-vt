var express = require('express');
var path = require('path');
var app     = express();
var port    = 	process.env.PORT || 8080;

// so express can find our stuff
app.use("/js",  express.static(__dirname + '/js'));
app.use("/css", express.static(__dirname + '/css'));


// ROUTES
// ==============================================

// we'll create our routes here
// get an instance of router
var router = express.Router();

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/bellows-falls', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
	res.redirect('/#18/43.133752/-72.444082');
});

router.get('/saxtons-river', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
	res.redirect('/#18/43.138568/-72.507736');
});

router.get('/montpelier', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
	res.redirect('/#18/44.26014/-72.57455');
});

router.get('*', function(req, res) {
	res.redirect('/');
});


// apply the routes to our application
app.use('/', router);

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);