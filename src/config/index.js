const baseUrl = process && process.env.REACT_APP_BASE_API_URL || 'http://172.16.6.253:1000';

module.exports = {
	urls: {
		auth: {
			login: '/api/auth',
			currentUser: '/api/me',
			signUp: '/api/signup'
		},
		responses: {
			commonResponses: '/api/answers/common_responses',
			referenceResponses: '/api/answers/reference_responses',
			updateCommonResponse: (id) => `/api/answers/common_responses/${id}`,
			updateReferenceResponse: (id) => `/api/answers/reference_responses/${id}`,
			audioUrl: (title, id) => {
				const token = localStorage.getItem('jwtToken');
				const encoded = encodeURI(`${baseUrl}/api/answers/${title}_responses/${id}/audio/${token.substring(1, token.length - 1)}`);
				return encoded;
			},
			newAudioUrl: text => {
				const token = localStorage.getItem('jwtToken');
				const encoded = encodeURI(`${baseUrl}/api/speech/textToSpeech?text=${text}&token=${token.substring(1, token.length - 1)}`);
				return encoded;
			},
			createReferenceResponse: '/api/answers/reference_responses',
			getReferenceResponse: id => `/api/answers/reference_responses/${id}`,
			deleteReferenceResponse: id => `/api/answers/reference_responses/${id}`,
			compareKeyword: '/api/answers/keywords/checkUsage',
			getCategories: '/api/answers/categories',
			createCategory: '/api/answers/categories',
			deleteCategory: id => `/api/answers/categories/${id}`,
			getUsers: '/api/users',
			createUser: '/api/users',
			deleteUser: id => `api/users/${id}`,
			getPrivileges: '/api/privileges',
			getPermissions: '/api/permissions'
		}
	},
	baseUrl
};
