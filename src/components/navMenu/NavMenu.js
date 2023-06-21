import * as React from 'react';

export default function NavMenu(props) {
	const { isOpen, isLoggedIn, homeClick, savedArticlesClick, children } = props;

	return (
		<>
			<div className={`nav-menu${isOpen?' nav-menu_opened':''}`}>
				<div className="nav-menu__container">
					<button className='nav-menu__button' onClick={homeClick}>Home</button>
					{ 
					isLoggedIn ?
					<button className='nav-menu__button' onClick={savedArticlesClick}>Saved articles</button>
					:
					<></>	
					}
				</div>
				{ children }
			</div>

			<div className={`overlay${isOpen?' overlay_opened':''}`}></div>
		</>
	);
  }