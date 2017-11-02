import React from 'react';
import { Link } from 'react-router-dom';

import logoIcon from '../../images/sword-feather-icon.png';
import tavernIcon from '../../images/ab-tavern-icon.svg';

export default function Menu({ title }) {

	return (
		<div className="menu">
			<div className="logo-container">
				<div className="logo-box">
					<img className="logo-icon" src={logoIcon} alt="" />
				</div>
				<Link to='/'><h1 className="title">Adventure Builder</h1></Link>
				<h2 className={`page-title ${ title }`}>{title}</h2>
			</div>
			<nav>
				
				<Link to='/newstory' className="nav-item">Story&nbsp;Creator</Link>
				<Link to='/about' className="nav-item">About</Link>
				<Link to='/tavern' className="nav-item tavern-btn">
					<img className="tavern-icon" src={tavernIcon} alt="Tavern" />
				</Link>
			</nav>
		</div>
	)
}
