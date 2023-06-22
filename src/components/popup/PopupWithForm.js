import { Link } from 'react-router-dom';
import * as React from 'react';

export default function PopupWithForm(props) {
	const { linkText, name, title, onSubmit, children, isValid, handleSwitchPopup, buttonText, isOpen, onClose, isForm = true } = props;

	// ! Switching between popups
	const handleLinkClick = (evt) => {
		onClose();
		handleSwitchPopup(evt);
	};

	return (
		<div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
			<div className="popup__content">
				<button className="popup__close-button" type="button" aria-label="close" onClick={onClose}></button>
				<h2 className={`popup__title${isForm ? '' : '_outer-form'}`}>{title}</h2>
				{isForm ? <form onSubmit={onSubmit} className={`popup__form form-${name}`} name={name}>
					{children}
					<button type="submit" className={`popup__button${isValid ? '' : '_invalid'}`}>
						{buttonText}
					</button>
					<h3 className="popup__link-text">or <Link to='/' onClick={handleLinkClick} className="popup__link">{linkText}</Link> </h3>
				</form> : children}
				{isForm ? <></> : <h3 className="popup__link-text">or <Link to='/' onClick={handleLinkClick} className="popup__link">{linkText}</Link> </h3>}
			</div>
		</div >
	);
};
