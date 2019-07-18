const baseUrl = process.env.REACT_APP_BASE_API_URL ? process.env.REACT_APP_BASE_API_URL : 'http://172.16.6.253:1000';

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
        return encodeURI(`${baseUrl}/api/answers/${title}_responses/${id}/audio/${token.substring(1, token.length - 1)}`);
			},
			newAudioUrl: text => {
				const token = localStorage.getItem('jwtToken');
        return encodeURI(`${baseUrl}/api/speech/textToSpeech?text=${text}&token=${token.substring(1, token.length - 1)}`);
			},
			createReferenceResponse: '/api/answers/reference_responses',
			getReferenceResponse: id => `/api/answers/reference_responses/${id}`,
			deleteReferenceResponse: id => `/api/answers/reference_responses/${id}`,
			compareKeyword: '/api/answers/keywords/checkUsage',
			getCategories: '/api/answers/categories',
			createCategory: '/api/answers/categories',
			deleteCategory: id => `/api/answers/categories/${id}`,
			moveToCategory: id => `/api/answers/categories/${id}`,
			getUsers: '/api/users',
			createUser: '/api/users',
			deleteUser: id => `/api/users/${id}`,
			getPrivileges: '/api/privileges',
			getPermissions: '/api/permissions',
			getSpeechToTextStatistics: '/api/statistics/speechToText',
			getTextToSpeechStatistics: '/api/statistics/textToSpeech',
			getTextProcessorStatistics: '/api/statistics/textProcessor',
			getDistinctConversationsStatistics: '/api/statistics/conversations/distinct',
			getStepsConversationsStatistics: '/api/statistics/conversations/steps',
			getDurationConversationsStatistics: '/api/statistics/conversations/duration',
			getEnvironment: '/api/group/environment',
			checkResponse: id => `/api/text/check/${id}`,
			getConversations: (id, query) => `/api/logs/conversations?page=${id}${query}`,
			getConversationsPages: (query) => `/api/logs/conversations_pages?${query}`,
			getConversationsMessages: (session) => `/api/logs/conversations/${session}`,
			getIntents: (id, query) => `/api/logs/intents?page=${id}${query}`,
			getIntentsPages: (query) => `/api/logs/intents_pages?${query}`,
		}
	},
	baseUrl
};
