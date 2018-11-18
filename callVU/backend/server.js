const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//auth packages
var session = require('express-session');
var passport = require('passport');

const PORT = process.env.PORT || 3000;

const corsOptions = {
	origin: /http:\/\/localhost:\d+/,
	credentials: true
};

app.use(express.static('dist'));
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		cookie: { httpOnly: false }
	})
);

app.use(passport.initialize());
app.use(passport.session());

const addUserRoutes = require('./routes/UserRoutes.js');
addUserRoutes(app);
const addLogRoutes = require('./routes/LogRoutes.js');
addLogRoutes(app);

http.listen(PORT, () => {
	console.log('listening on *:3000');
});
