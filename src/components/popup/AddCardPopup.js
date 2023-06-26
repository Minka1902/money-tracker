import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CreditCardForm } from "../forms/Forms";

export default function AddCardPopup(props) {
    const { linkText, isOpen, handleSwitchPopup, onSubmit, isLoggedIn, onClose } = props;

    // ! submit
    const handleSubmit = (card) => {
        onSubmit(card);
    };

    return (
        <>
            <PopupWithForm isForm={false} linkClick={handleSwitchPopup} linkText={isLoggedIn ? 'Sign out' : linkText} name="add-card" title="Add a card" isOpen={isOpen} onClose={onClose}>
                {isLoggedIn ?
                    <CreditCardForm onSubmit={handleSubmit} isOpen={isOpen} />
                    :
                    <h2 className="popup__content_other">Please sign in.</h2>}
            </PopupWithForm>
        </>
    );
};
