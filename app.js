const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const methodOverride = require('method-override');
// eslint-disable-next-line camelcase
const { trim_all } = require('request_trimmer');

const appConfig = require('./config/app');
const sessionConfig = require('./config/session');

// Initialize passport variables
// eslint-disable-next-line no-unused-vars
const passportConfig = require('./config/passport');

// Import Routes
const indexRouter = require('./routes/index');

// app instance
const app = express();

// view engine setup
const viewsPath = 'resources/views';
app.set('views', path.join(__dirname, viewsPath));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trim_all);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// setup the flash message middleware
app.use(flash());

// setup the session middleware
app.use(
	session({
		store: sessionConfig.store,
		secret: appConfig.key,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: sessionConfig.maxAge,
			// cookie secure: it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies
			// secure: process.env.NODE_ENV === 'production',
			secure: false,
			httpOnly: true,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(csrf({ cookie: true }));

// Serve como middleware para a camada view
app.use((req, res, next) => {
	res.locals.config = {
		name: appConfig.name,
		env: appConfig.env,
		tz: appConfig.tz,
		version: appConfig.version,
		_csrfToken: req.csrfToken(),
	};

	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.message = req.flash('message');
	res.locals.user = req.user || null;

	res.locals.views = `${process.cwd()}/${viewsPath}`;

	res.locals.old = (name) => {
		const { hasOwnProperty } = Object.prototype;
		if (hasOwnProperty.call(res.locals, 'body')) {
			return res.locals.body[name] ? res.locals.body[name] : '';
		}
		if (hasOwnProperty.call(req.query, name)) {
			return req.query[name] ? req.query[name] : '';
		}
		return '';
	};

	res.locals.getFullUrl = () => {
		const protocol = appConfig.force_https ? 'https' : req.protocol;

		const { host } = req.headers;
		return `${protocol}://${host}`;
	};

	res.locals.asset = (localPath = null) => {
		let sanitizePath = '';
		if (!localPath) {
			return '';
		}

		if (localPath.length > 0) {
			if (localPath[0] === '/') {
				sanitizePath = localPath.substring(1);
			} else {
				sanitizePath = localPath;
			}
			const hostUrl = res.locals.getFullUrl();
			return `${hostUrl}/${sanitizePath}`;
		}

		return '';
	};

	res.locals.route = (localPath = null) => res.locals.asset(localPath);

	next();
});

// Requisições POST sem o CSRF Token
app.use((err, req, res, next) => {
	if (err.code !== 'EBADCSRFTOKEN') return next(err);

	// handle CSRF token errors here
	res.status(403);
	res.send('form tampered with');
	return null;
});

// override with POST having ?_method=DELETE Or ?_method=PUT
app.use(methodOverride('_method'));

// ROTAS
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404, 'Faça login para visualizar esta página.'));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
