import { Link } from 'react-router-dom';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

export default function PopupWithForm(props) {
	const { linkText, name, title, onSubmit, children, isValid, linkClick, buttonText, isOpen, onClose, isForm = true, isSmall } = props;
	const history = useHistory();

	// ! Switching between popups
	const handleLinkClick = (evt) => {
		onClose();
		if (linkClick) {
			linkClick(evt);
		}
	};

	const determineIsLink = () => {
		if (isSmall) {
			return false;
		} else {
			if (isForm) {
				return false;
			} else {
				return true;
			}
		}
	};

	return (
		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
			<div className={`popup__content ${isSmall ? 'width300' : ''}`}>
				<button className="popup__close-button" type="button" aria-label="close" onClick={onClose}></button>
				<h2 className={`popup__title${isForm ? '' : '_outer-form'}`}>{title}</h2>
				{isForm ? <form onSubmit={onSubmit} className={`popup__form form-${name}`} name={name}>
					{children}
					<button type="submit" className={`popup__button${isValid ? '' : '_invalid'}`}>
						{buttonText}
					</button>
					<h3 className="popup__link-text">or <Link to={history.location.pathname} onClick={handleLinkClick} className="popup__link">{linkText}</Link> </h3>
				</form> : children}
				{determineIsLink() ? <h3 className="popup__link-text">or <Link to={history.location.pathname} onClick={handleLinkClick} className="popup__link">{linkText}</Link> </h3> : <></>}
			</div>
		</div >
	);
};
