const logService = require('../services/logService');

module.exports = app => {
	app.post('/start', authenticationMiddleware(), (req, res) => {
		const fileName = req.body;
		logService.startTracking(fileName.fileName);
		res.json({ start: 'true' });
	});

	app.post('/stop', authenticationMiddleware(), (req, res) => {
		logService.stopTracking().then(()=>{
			res.sendStatus(200);
		});
	});

	app.get('/status', authenticationMiddleware(), (req, res) => {
		logService.getAllLogs().then(logHistory => {
			res.json(logHistory);
		});
	});
};

function authenticationMiddleware() {
	return (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		console.log('not Authenticated');
		res.sendStatus(401);
	};
}
