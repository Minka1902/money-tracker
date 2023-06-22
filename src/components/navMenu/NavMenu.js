import * as React from 'react';

export default function NavMenu(props) {
	const { isOpen, isLoggedIn, children, buttons } = props;

	const determineButton = (button) => {
		if (isLoggedIn) {
			return true;
		} else {
			if (button.isAllowed) {
				return true;
			}
		}
		return false;
	};

	return (
		<>
			<div className={`nav-menu${isOpen ? ' nav-menu_opened' : ''}`}>
				<div className="nav-menu__container">
					{buttons.map((button, index) => {
						return (determineButton(button) ? <button className='nav-menu__button' onClick={button.onClick} key={index}>{button.name}</button> : <></>)
					})}
				</div>
				{children}
			</div>

			<div className={`overlay${isOpen ? ' overlay_opened' : ''}`}></div>
		</>
	);
}