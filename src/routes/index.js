import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../components/common/protected/route';

import Login from '../components/auth/Login';
import Home from '../containers/Home';
import Answers from '../containers/Answers/Answers';
import History from '../containers/History/History';
import Account from '../containers/Account/Account';
import Layout from '../containers/Layout';
import Users from '../containers/Users/Users';
import UsageStatistics from '../containers/Statistics/Statistics';
import EnvironmentPage from "../containers/EnvironmentPage";
import LogsConversations from "../containers/LogsConversations/LogsConversations";

function Routes() {
	return (
		<Switch>
			<Route exact path={'/login'} component={Login} />

			<ProtectedRoute
				requiredRoles='ALLOWED_HISTORY_VIEWING'
				path={'/history/irrelevant'}
				component={() => <Layout><History/></Layout> }
				saveUrlOnFail
			/>

			<ProtectedRoute
				path={'/account'}
				component={() => <Layout><Account/></Layout> }
				saveUrlOnFail
			/>

			<ProtectedRoute
				path={'/answers'}
				component={() => <Layout><Answers/></Layout> }
				saveUrlOnFail
			/>

			<ProtectedRoute
        requiredAnyRoles={['ALLOWED_USERS_EDITING', 'ALLOWED_ROLES_EDITING']}
				path={'/users'}
				component={() => <Layout><Users/></Layout>}
				saveUrlOnFail
			/>

			<ProtectedRoute
				requiredAnyRoles={['ALLOWED_USAGE_STATISTICS_VIEWING', 'ALLOWED_CONVERSATION_STATISTICS_VIEWING']}
				path={'/statistics'}
				component={() => <Layout><UsageStatistics/></Layout>}
				saveUrlOnFail
			/>

			<ProtectedRoute
				path={'/group/environment'}
				component={() => <Layout><EnvironmentPage/></Layout> }
				saveUrlOnFail
			/>

			<ProtectedRoute
				requiredRoles='ALLOWED_LOGS_VIEWING'
				path={'/logs/conversations'}
				component={() => <Layout><LogsConversations/></Layout>}
				saveUrlOnFail
			/>

			<ProtectedRoute
				path={'/'}
				component={() => <Layout><Home/></Layout> }
				saveUrlOnFail
			/>
		</Switch>
	);
}

export default Routes;
