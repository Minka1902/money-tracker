import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function PopupCvv(props) {
    const { isOpen, onClose, onSubmit } = props;
    const [cvv, setCvv] = React.useState('');
    const [isCvvCorrect, setCvvCorrect] = React.useState(true);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (evt.type === 'submit' && evt.target.classList.contains('popup__form')) {
            onClose();
            onSubmit(cvv);
        }
    }

    React.useEffect(() => {
        if (cvv.length === 0) {
            setCvvCorrect(true);
        } else {
            if (cvv.length === 3) {
                setCvvCorrect(true);
            } else {
                setCvvCorrect(false);
            }
        }
    }, [cvv]);

    React.useEffect(() => {
        setCvv('');
    }, [isOpen]);

    return (
        <>
            <PopupWithForm linkText='Leave this popup.' onSubmit={handleSubmit} isValid={true} name="cvv" title="To delete, enter card CVV" isOpen={isOpen} onClose={onClose} buttonText='Delete'>
                <h3 className='popup__input-title'>CVV</h3>
                <input
                    className="popup__input"
                    value={cvv}
                    onChange={(evt) => setCvv(evt.currentTarget.value)}
                    placeholder="Enter CVV"
                    id="confirm-cvv-input"
                    type="string"
                    name="cvvInput"
                    required
                    minLength="3"
                    maxLength="3"
                    autoComplete="off"
                />
                <p className={`popup__error-massage${isCvvCorrect ? '' : '_visible'}`}>CVV incorrect.</p>
            </PopupWithForm>
        </>
    );
}
