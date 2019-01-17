const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const seriesRouter = require('./routes/series');
const misEntregasRouter = require('./routes/entregas');
const comentariosRouter = require('./routes/comentarios');
const misSeriesRouter= require('./routes/series');
const api = require('./routes/api');




const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));


app.use(cookieSession({
	name: 'session',
	keys: ['hello'],
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/series', seriesRouter);
app.use('/entregas', misEntregasRouter);
app.use('/comentarios', comentariosRouter);
app.use('/api', api);
app.use('/', misSeriesRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
