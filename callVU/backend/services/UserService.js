const db = require('./DBService');
const passport = require('passport');



function getUser(userName, password) {
	let sql = `SELECT id ,user_name, password
	FROM user
	WHERE user_name  = ? AND password = ?`;
	return new Promise((resolve, reject) => {
		db.get(sql, [userName, password], (err, row) => {
			if (err) {
				console.error(err.message);
				reject(err);
			}
			// row ? log(row.id, row.user_name): log(`No user found with the userName ${userName}`);
			resolve(row);
		});
	});
}



module.exports = {
	getUser
};
