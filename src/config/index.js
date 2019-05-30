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
				const token = sessionStorage.getItem('jwtToken');
				return `${baseUrl}/api/answers/${title}_responses/${id}/audio/${token.substring(1, token.length - 1)}`
			},
			createReferenceResponse: '/api/answers/reference_responses',
			getReferenceResponse: id => `/api/answers/reference_responses/${id}`,
			deleteReferenceResponse: id => `/api/answers/reference_responses/${id}`,
		}
	},
	baseUrl
};
