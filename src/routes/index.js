import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../components/common/protected/route';

import Login from '../components/auth/Login';
import Home from '../containers/Home';
import Answers from '../containers/Answers/Answers'
import History from '../containers/History/History'
import Sidebar from '../components/Sidebar'

function Routes() {
	return (
		<Switch>
			<Route exact path={'/login'} component={() => <Login register='/register'></Login>} />
			<ProtectedRoute
				path={'/answers'}
				component={() => <Fragment><Sidebar title='answers'/><Answers/></Fragment>}
				saveUrlOnFail
			/>
			<ProtectedRoute
				path={'/history'}
				component={() => <Fragment><Sidebar title='history'/><History/></Fragment>}
				saveUrlOnFail
			/>
			<ProtectedRoute
				path={'/'}
				component={() => <Fragment><Sidebar title='home'/><Home/></Fragment>}
				saveUrlOnFail
			/>
		</Switch>
	);
}

export default Routes;
