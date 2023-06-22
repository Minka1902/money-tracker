import * as React from 'react';
import NavBar from "../navBar/NavBar";
import NavMenu from "../navMenu/NavMenu";
import HeaderButton from './HeaderButton';
import * as Buttons from '../buttons/Buttons';

export default function Header(props) {
	let logo = '';
	const { isLoggedIn, isHomePage, theme = true, scroll, noScroll, handleLogout, navBarButtons, handleButtonClick, children } = props;
	const [isNavBar, setIsNavBar] = React.useState(window.innerWidth > 520);
	const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false);
	const [isFirstRender, setIsFirstRender] = React.useState(true);

	React.useEffect(() => {
		const checkWindowDimensions = () => {
			if (window.innerWidth > 520) {
				setIsNavBar(true);
			} else {
				setIsNavBar(false);
			}
		};

		window.addEventListener('resize', checkWindowDimensions);
		window.removeEventListener('resize', checkWindowDimensions);

		checkWindowDimensions();
	}, [isHomePage]);

	React.useEffect(() => {
		if (window.innerWidth < 520 && isLoggedIn === true) {
			if (!isFirstRender) {
				toggleNavMenu();
			}
			setIsFirstRender(false);
		}
		// eslint-disable-next-line
	}, [isLoggedIn]);

	const toggleNavMenu = () => {
		if (isNavMenuOpen) {
			setIsNavMenuOpen(false);
			scroll();
		} else {
			setIsNavMenuOpen(true);
			noScroll();
		}
	};

	const firstButtonClicked = () => {
		setIsNavMenuOpen(false);
		navBarButtons[0].onClick();
	};

	return (
		<div className={`h-sb__container${theme ? ' h-sb__container_no-background' : ''}`}>
			<header className={`header${theme ? ' header_theme_dark' : ''}${isNavMenuOpen ? ' header_darker' : ''}`}>
				<img className={`header__logo ${theme ? 'header__logo_theme_dark' : ''}${isNavMenuOpen ? '_not' : ''}`} src={logo} alt="Logo" />
				{isNavBar ?
					<>
						<NavBar buttons={navBarButtons} />
						<HeaderButton isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleButtonClick={handleButtonClick} theme={theme} />
					</>
					:
					<>
						<NavMenu isOpen={isNavMenuOpen} isLoggedIn={isLoggedIn} firstButtonClick={firstButtonClicked}>
							<HeaderButton isNavMenu={true} toggleNavMenu={toggleNavMenu} isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleButtonClick={handleButtonClick} theme={theme} />
						</NavMenu>
						<Buttons.ButtonHamburger onClick={toggleNavMenu} theme={isNavMenuOpen} />
					</>
				}
			</header>
			{children}
		</div>
	);
}
