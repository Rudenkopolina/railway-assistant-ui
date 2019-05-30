import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../components/common/protected/route';

import Login from '../components/auth/Login';
import Home from '../containers/Home';
import Answers from '../containers/Answers/Answers'
import History from '../containers/History/History'
import Account from '../containers/Account/Account'
import Sidebar from '../components/Sidebar'
import Layout from '../containers/Layout'

function Routes() {
	return (
		<Switch>
			<Route exact path={'/login'} component={() => <Login register='/register'></Login>} />

			<ProtectedRoute
				requiredRoles='ALLOWED_HISTORY_EDITING'
				path={'/history'}
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
				path={'/'}
				component={() => <Layout><Home/></Layout> }
				saveUrlOnFail
			/>
		</Switch>
	);
}

export default Routes;
