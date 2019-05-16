import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Header extends Component {
	constructor(props) {
		super();
	}
	render() {
		return (
			<div className="Header">
				<div>
					<Link to='/'>Home</Link>
					<Link to='/register'>Register</Link>
					<Link to='/animesearch'>FindAnime</Link>
				</div>

			</div>
		);
	}
}

export default Header