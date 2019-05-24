import React from 'react';
import {Link} from 'react-router-dom';

class HomePage extends React.Component {
	render() {
		return (
			<div style={{ marginTop: '15%' }}>
				<h1>Home page</h1>
				<Link to="/login">to login</Link>
				<Link to="/answers">to Answers</Link>
			</div>
		);
	}
}

export default HomePage;
