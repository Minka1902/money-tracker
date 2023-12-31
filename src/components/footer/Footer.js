import LILogo from '../../images/linkedin-icon.svg';
import GHLogo from '../../images/github_icon.svg';

export default function Footer({ children }) {
	const githubClick = (evt) => {
		if (evt.target.classList.contains("footer__icon")) {
			window.open("https://github.com/Minka1902", '_blank', 'noopener,noreferrer');
		}
	};

	const linkedInClick = (evt) => {
		if (evt.target.classList.contains("footer__icon")) {
			window.open("https://www.linkedin.com/in/michael-scharff-1525b6235/", '_blank', 'noopener,noreferrer');
		}
	};

	return (
		<footer className="footer">
			<p className="footer__text">&copy; Powered by Michael Scharff</p>
			<div className='footer__container'>
				<div className="footer__container-links">
					{children}
				</div>
				<div className="footer__container-icons">
					<img className="footer__icon" src={GHLogo} alt="Git-Hub icon" onClick={githubClick} />
					<img className="footer__icon" src={LILogo} alt="LinkedIn icon" onClick={linkedInClick} />
				</div>
			</div>
		</footer>
	);
}
