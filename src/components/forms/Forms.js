import React from "react";
import * as Buttons from '../buttons/Buttons'
import CurrentEntryContext from "../../contexts/CurrentEntryContext";

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

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

export function EntryForm({ onSubmit, isOpen, isEdit }) {
    const currentEntry = React.useContext(CurrentEntryContext);
    const today = new Date();
    const [amount, setAmount] = React.useState('');
    const [spentAt, setSpentAt] = React.useState('');
    const [currency, setCurrency] = React.useState('NIS');
    const [date, setDate] = React.useState(formatDate(today));
    const [comment, setComment] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEdit) {
            const tempEntry = { time: date, amount, spentAt, currency, comment: comment.length === 0 ? 'No comment.' : comment }
            onSubmit({ id: currentEntry._id, entry: tempEntry });
        } else {
            onSubmit({ entry: { time: date, amount, spentAt, currency, comment: comment.length === 0 ? 'No comment.' : comment } });
        }
    };

    React.useEffect(() => {
        if (!isOpen) {
            setComment('');
            setCurrency('NIS');
            setSpentAt('');
            setDate(formatDate(today));
            setAmount('');
        } else {
            if (isEdit) {
                if (currentEntry) {
                    setComment(currentEntry.comment === 'No comment.' ? '' : currentEntry.comment);
                    setCurrency(currentEntry.currency);
                    setSpentAt(currentEntry.spentAt);
                    setDate(formatDate(new Date(currentEntry.time)));
                    setAmount(currentEntry.amount);
                }
            }
        }
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
                    required={isEdit ? true : false}
                />
                <input
                    type="text"
                    className="entry-form__input"
                    placeholder="Where did you spend it?"
                    value={spentAt}
                    onChange={(e) => setSpentAt(e.target.value)}
                    required={isEdit ? true : false}
                    autoComplete="on"
                />
                <input
                    type="datetime-local"
                    className="entry-form__input"
                    placeholder="1/1/2000 12:00"
                    value={(date || '').toString().substring(0, 16)}
                    onChange={(e) => setDate(e.target.value)}
                    required={isEdit ? true : false}
                />
                <input
                    type="search"
                    className="entry-form__input"
                    placeholder="Currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required={isEdit ? true : false}
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
