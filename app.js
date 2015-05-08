var express = require('express');
var router = express.Router();

var path = require('path');
var logger = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./controllers/index');

var api = {
	users : require('./api/controllers/users'),
	cart : require('./api/controllers/cart')
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

//pages
router.get('/', index.index);
router.get('/home', index.index);
router.get('/cart', index.index);

//api
router.get('/api/users/getAll', api.users.getAll);

router.post('/api/cart/save', api.cart.save);
router.get('/api/cart/get', api.cart.getCart);
router.post('/api/cart/checkDiscount', api.cart.checkDiscount);
router.post('/api/cart/checkout', api.cart.checkout);


// catch 404 and forward to error handler
router.get('*', function (req, res, next) {
	res.status(404);

	// respond with html page
	if (req.accepts('html')) {
		res.render('404.hbs', {url: req.url, layout: null});
		return;
	}

	// respond with json
	if (req.accepts('json')) {
		res.send({error: 'Not found'});
		return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
