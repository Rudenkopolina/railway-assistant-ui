import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Protected from '../components/common/protected/container';
import ProtectedRoute from '../components/common/protected/route';

import Login from '../components/auth/Login';
import Home from '../containers/Home';
import Answers from '../components/Answers/Answers'

function Routes() {
	return (
		<Switch>
			<Route exact path={'/login'} component={() => <Login register='/register'></Login>} />
			<ProtectedRoute path={'/answers'} component={Answers} saveUrlOnFail />
			<ProtectedRoute path={'/'} component={Home} saveUrlOnFail />
		</Switch>
	);
}

export default Routes;
