import * as React from 'react';
import NavBar from "../navBar/NavBar";
import NavMenu from "../navMenu/NavMenu";
import logo from "../../images/NewsExplorer-logo.svg";
import logoThemeDark from "../../images/NewsExplorer-theme-dark.svg";
import HeaderButton from './HeaderButton';
import openMenuIcon from '../../images/open-menu.svg';
import openMenuIconThemeDark from '../../images/open-menu-theme-dark.svg';
import headerCloseIcon from '../../images/header-close-icon.svg';

export default function Header(props) {
	const { handleButtonClick, isHomePage, scroll, noScroll, handleLogout, savedArticlesClick, homeClick, isLoggedIn, theme, children } = props;
	const [isNavBar, setIsNavBar] = React.useState(window.innerWidth > 520);
	const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);
	const [isFirstRender, setIsFirstRender] = React.useState(true);

	const checkWindowDimensions = () => {
		if (window.innerWidth > 520) {
			setIsNavBar(true);
		} else {
			setIsNavBar(false);
		}
	};

	React.useEffect(() => {
		checkWindowDimensions();
	}, [isHomePage]);

	React.useEffect(() => {
		if (window.innerWidth < 520 && isLoggedIn === true) {
			if(!isFirstRender){
				toggleNavMenu();
			}
			setIsFirstRender(false);
		}
		// eslint-disable-next-line
	}, [isLoggedIn]);

	React.useEffect(() => {
		window.addEventListener('resize', checkWindowDimensions);
	});

	const toggleNavMenu = () => {
		if(isNavMenuOpen){
			setIsNavMenuOpen(false);
			scroll();
		}else{
			setIsNavMenuOpen(true);
			noScroll();
		}
	}

	const determineButtonSrc = () => {
		if (theme) {
			if (isNavMenuOpen) {
				return headerCloseIcon;
			} else {
				return openMenuIconThemeDark;
			}
		} else {
			if (isNavMenuOpen) {
				return headerCloseIcon;
			}
		}
		return openMenuIcon;
	}

	const determineLogoSrc = () => {
		if (theme) {
			if (isNavMenuOpen) {
				return logo;
			} else {
				return logoThemeDark;
			}
		} else {
			return logo;
		}
	}

	const savedArticlesClicked = () => {
		setIsNavMenuOpen(false);
		savedArticlesClick();
	}

	const homeClicked = () => {
		setIsNavMenuOpen(false);
		homeClick();
	}

	return (
		<div className={`h-sb__container${theme ? ' h-sb__container_no-background' : ''}`}>
			<header className={`header${theme ? ' header_theme_dark' : ''}${isNavMenuOpen ? ' header_darker' : ''}`}>
				<img className={`header__logo ${theme ? 'header__logo_theme_dark' : ''}${isNavMenuOpen ? '_not' : ''}`} src={determineLogoSrc()} alt="News explorer logo" />
				{isNavBar ?
					<>
						<NavBar isHomePage={isHomePage} theme={theme} savedArticlesClick={savedArticlesClicked} homeClick={homeClicked} isLoggedIn={isLoggedIn} />
						<HeaderButton isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleButtonClick={handleButtonClick} theme={theme} />
					</>
					:
					<>
						<NavMenu isOpen={isNavMenuOpen} isLoggedIn={isLoggedIn} savedArticlesClick={savedArticlesClicked} homeClick={homeClicked}>
							<HeaderButton isNavMenu={true} toggleNavMenu={toggleNavMenu} isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleButtonClick={handleButtonClick} theme={theme} />
						</NavMenu>
						<button className={`header__button ${!isNavBar ? 'header__button_menu' : ''} ${theme ? ' header__logo_theme_dark' : ''}`} onClick={toggleNavMenu}>
							<img src={determineButtonSrc()} alt="Menu icon" />
						</button>
					</>
				}
			</header>
			{children}
		</div>
	);
}
