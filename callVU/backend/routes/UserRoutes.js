const UserService = require('../services/UserService');
var passport = require('passport');

module.exports = app => {
	app.post('/login', (req, res) => {
		let userName = req.body.userName;
		let password = req.body.password;

		UserService.getUser(userName, password).then(user => {
			req.login(user, err => {
				if (err) {
					res.sendStatus(401);
				} else {
					res.json(user);
				}
			});
		});
	});

	app.post('/logout', (req, res) => {
		req.logout()
		req.session.destroy();
		res.sendStatus(200);
	});
};

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});
