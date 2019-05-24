const baseUrl = process && process.env.REACT_APP_BASE_API_URL || 'http://172.16.6.253:1000';

module.exports = {
	urls: {
		auth: {
			login: '/api/auth',
			currentUser: '/api/me',
			signUp: '/api/signup'
		}
	},
	baseUrl
};
