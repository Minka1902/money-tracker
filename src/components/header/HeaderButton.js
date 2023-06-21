import * as React from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import signOutLogo from "../../images/sign-out-icon.svg";
import signOutLogoThemeDark from "../../images/sign-out-icon-theme-dark.svg";

export default function HeaderButton(props) {
	const { handleButtonClick, toggleNavMenu, handleLogout, isLoggedIn, theme, isNavMenu } = props;
	const currentUser = React.useContext(CurrentUserContext);

	const determineSrc = () => {
		if(theme){
			if(isNavMenu){
				return signOutLogo;
			}
			return signOutLogoThemeDark;
		}
		return signOutLogo;
	}

	const handleLogoutClick = () => {
		handleLogout();
		if(toggleNavMenu){
			toggleNavMenu();
		}
	}

	return (
		<>
			{ isLoggedIn ?
				<button className={`header__button${theme?' header__button_theme_dark':''}${isNavMenu?'_modified':''}`} onClick={handleLogoutClick}>
					{currentUser.username}<img src={determineSrc()} alt="Sign out icon" />
				</button>
				: 
				<button className={`header__button${theme?' header__button_theme_dark':''}${isNavMenu?'_modified':''}`} onClick={handleButtonClick}>
					Sign in
				</button>
			}
		</>
	);
  }