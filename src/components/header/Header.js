import * as React from 'react';
import NavBar from "../navBar/NavBar";
import NavMenu from "../navMenu/NavMenu";
import HeaderButton from './HeaderButton';
import * as Buttons from '../buttons/Buttons';

export default function Header(props) {
	let logo = '';
	const { isLoggedIn, isHomePage, theme = true, scroll, noScroll, handleLogout, buttons, handleButtonClick, children } = props;
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
		window.addEventListener('resize', checkWindowDimensions);
		window.removeEventListener('resize', checkWindowDimensions);

		checkWindowDimensions();
	}, [isHomePage]);

	React.useEffect(() => {
		window.addEventListener('resize', checkWindowDimensions);
	});

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

	return (
		<div className={`h-sb__container${theme ? ' h-sb__container_no-background' : ''}`}>
			<header className={`header${theme ? ' header_theme_dark' : ''}${isNavMenuOpen ? ' header_darker' : ''}`}>
				<img className={`header__logo ${theme ? 'header__logo_theme_dark' : ''}${isNavMenuOpen ? '_not' : ''}`} src={logo} alt="Logo" />
				{isNavBar ?
					<>
						<NavBar buttons={buttons} isLoggedIn={isLoggedIn} />
						<HeaderButton isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleButtonClick={handleButtonClick} theme={theme} />
					</>
					:
					<>
						<NavMenu isOpen={isNavMenuOpen} isLoggedIn={isLoggedIn} buttons={buttons}>
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
