import React from "react";
import * as Buttons from '../buttons/Buttons'

export function CreditCardForm({ onSubmit, isOpen, displayCvv = true }) {
    const [name, setName] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [cardDate, setCardDate] = React.useState('');
    const [cvv, setCvv] = React.useState('');

    // ! Resetting the popup when closing
    React.useEffect(() => {
        setName('');
        setCardDate('');
        setCardNumber('');
        setCvv('');
    }, [isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ ownerName: name, cardNumber: cardNumber, expiry: cardDate, cvv: cvv });
    }

    return (
        <>
            <div className="modal">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="credit-card-info--form">
                        <div className="input_container">
                            <label className="input_label">Card holder full name</label>
                            <input
                                className="input_field"
                                type="text"
                                name="input-name"
                                title="Card holder full name"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="input_container">
                            <label className="input_label">Card Number</label>
                            <input
                                className="input_field"
                                type="number"
                                name="input-name"
                                title="Card number"
                                placeholder="0000 0000 0000 0000"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </div>
                        <div className="input_container">
                            <label className="input_label">Expiry Date / CVV</label>
                            <div className="split">
                                <input
                                    className="input_field"
                                    type="text"
                                    name="input-name"
                                    title="Expiry Date"
                                    placeholder="31/12"
                                    value={cardDate}
                                    onChange={(event) => setCardDate(event.target.value)}
                                />
                                <input
                                    className={`input_field ${displayCvv ? '' : 'transparent'}`}
                                    type="number"
                                    name="cvv"
                                    title="CVV"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={(event) => setCvv(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="purchase--button popup__button-purchase">Add card</button>
                </form>
            </div>
        </>
    );
};

export function EntryForm({ onSubmit, isOpen }) {
    const [amount, setAmount] = React.useState('');
    const [spentAt, setSpentAt] = React.useState('');
    const [comment, setComment] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ time: new Date(), amount, spentAt, currency: 'NIS', comment: comment.length === 0 ? 'No comment.' : comment });
        // onSubmit({ time: new Date(), amount, spentAt, currency: 'NIS', comment });
    };

    React.useEffect(() => {
        setComment('');
        setSpentAt('');
        setAmount('');
    }, [isOpen]);

    return (
        <>
            <form className="entry-form" onSubmit={handleSubmit}>
                <input
                    type="number"
                    className="entry-form__input"
                    placeholder="How much did you spend?"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="entry-form__input"
                    placeholder="Where did you spend it?"
                    value={spentAt}
                    onChange={(e) => setSpentAt(e.target.value)}
                    required
                />
                <textarea
                    className="entry-form__textarea"
                    placeholder="If you want to add a comment, do it here."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <Buttons.ButtonSubmit />
            </form>
        </>
    );
};