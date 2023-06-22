import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CreditCardForm } from "../forms/Forms";

export default function AddCardPopup(props) {
    const { linkText, isOpen, handleSwitchPopup, onSubmit, isLoggedIn, onClose } = props;
    const [name, setName] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState(true);
    const [cardDate, setCardDate] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);

    // ! submit
    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (isValid) {
            onSubmit({ name, });
            setIsValid(false);
        }
    };

    // ! Resetting the popup when closing
    React.useEffect(() => {
        setName('');
    }, [isOpen]);

    return (
        <>
            <PopupWithForm isForm={false} handleSwitchPopup={handleSwitchPopup} linkText={isLoggedIn ? 'Sign out' : linkText} name="add-card" title="Add a card" isOpen={isOpen} onClose={onClose}>
                {isLoggedIn ?
                    <CreditCardForm onSubmit={handleSubmit} isOpen={isOpen} displayCvv={false} />
                    :
                    <h2 className="popup__content_other">Please sign in.</h2>}
            </PopupWithForm>
        </>
    );
};
