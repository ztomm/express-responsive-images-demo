const express = require('express');
const path = require('path');
const logger = require('morgan')

const app = express();
app.set('host', 'localhost');
app.set('port', 3000);

app.use(logger('tiny'))

// set the view engine to ejs
app.set('view engine', 'ejs');

// route to index page 
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/views/index.htm'));
});

// require module
const responsiveImages = require('express-responsive-images');

// add module as middleware to express
app.use(
	responsiveImages({
		staticDir: '/public',
		watchedDirectories: ['/images'],
		directScaling: true,
		directScaleSizes: [200, 400],
		debug: true,
	})
);

// static route
app.use('/', express.static(path.join(__dirname, 'public')));

// start express server
app.listen(app.get('port'), () => {
	console.log(`App is running at http://${app.get('host')}:${app.get('port')}`);
	console.log(`Press CTRL-C to stop\n`);
});