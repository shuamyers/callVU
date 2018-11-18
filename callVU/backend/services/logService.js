const chokidar = require('chokidar');
const db = require('./DBService');
const log = console.log.bind(console);

let root_file_name;
let watcher;

function startTracking(fileName) {
	root_file_name = fileName;
	watcher = chokidar.watch(fileName, {
		cwd: 'C:',
		persistent: true,
		ignoreInitial: true,
		awaitWriteFinish: {
			stabilityThreshold: 2000,
			pollInterval: 1000
		}
	});
	watcher
		.on('add', function(path) {
			logToDB('addFile','File has been added', path, root_file_name);
			log('File', path.substring(9), 'has been added');
		})
		.on('unlink', function(path) {
			logToDB('unlinkFile','File hes been removed', path, root_file_name);
			log('File', path.substring(9), 'has been removed');
		})
		.on('change', path => {
			logToDB('fileChange','File hes been changed', path, root_file_name);
			log(`File ${path} has been changed`);
		})
		.on('addDir', path => {
			logToDB('addDir','Directory hes been Added', path, root_file_name);
			log(`Directory ${path.substring(9)} has been added`);
		})
		.on('unlinkDir', path => {
			logToDB('unlinkDir','Directory hes been removed', path, root_file_name);
			log(`Directory ${path.substring(9)} has been removed`);
		});
}

function stopTracking() {
	return new Promise((resolve, reject) => {
		watcher.close();
		resolve();
	});
}

function logToDB(action,description, path, rootFileName) {
	let cleanPath = path.substring(9);
	let sql =
		'INSERT INTO log_history (action,description, file_path ,root_file_name) VALUES (?,?,?,?);';

	db.run(sql, [action,description, cleanPath, rootFileName], function(err) {
		if (err) {
			return console.log(err.message);
		}
	});
}

function getAllLogs() {
	return new Promise((resolve, reject) => {
		let sql = `SELECT * FROM log_history WHERE root_file_name = '${root_file_name}';`;

		db.all(sql, [], (err, rows) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}

module.exports = {
	startTracking,
	stopTracking,
	getAllLogs
};
