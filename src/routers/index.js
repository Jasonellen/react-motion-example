import React, {Component} from 'react';
import {Router, Route, hashHistory} from 'react-router';

import Home from '../containers/Home'

class Routers extends Component {

	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Home}></Route>
			</Router>
		)
	}
}
export default Routers
