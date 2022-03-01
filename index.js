const protect = require('static-auth');
const safeCompare = require('safe-compare');

const USER_NAME = '4Rw7E3bKKG_2P';
const PASSWORD = 'dwUE3YnUKXt.M';

const index = protect(
	'/',
	(username, password) => {
		return safeCompare(username, USER_NAME) && safeCompare(password, PASSWORD)
},
	{
		directory: `${ __dirname }/dist`,
		onAuthFailed: (res) => {
			res.end('Authentication failed.')
		},
	}
);

module.exports = index;