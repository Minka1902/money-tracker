import React, { useState } from 'react';
import './creditCard.css';

function CreditCard() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    return (
        <div className="CreditCard">
            <div className="CreditCard__front">
                <div className="CreditCard__logo"></div>
                <div className="CreditCard__number">{cardNumber}</div>
                <div className="CreditCard__name">John Doe</div>
                <div className="CreditCard__expiry-cvv">
                    <div className="CreditCard__expiry">{expiryDate}</div>
                    <div className="CreditCard__cvv">{cvv}</div>
                </div>
            </div>
            <div className="CreditCard__back">
                <div className="CreditCard__stripe"></div>
                <div className="CreditCard__cvv-back">{cvv}</div>
            </div>
            <form className="CreditCard__form">
                <label className="CreditCard__label" htmlFor="cardNumber">Card Number</label>
                <input
                    className="CreditCard__input"
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(evt) => setCardNumber(evt.currentTarget.value)} />

                <label className="CreditCard__label" htmlFor="expiryDate">Expiry Date</label>
                <input
                    className="CreditCard__input"
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(evt) => setExpiryDate(evt.currentTarget.value)} />

                <label className="CreditCard__label" htmlFor="cvv">CVV</label>
                <input
                    className="CreditCard__input"
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(evt) => setCvv(evt.currentTarget.value)} />

                <button className="CreditCard__button">Charge Card</button>
            </form>
        </div>
    );
}

export default function CreditCardForm() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (cardNumber && expiryDate && cvv) {
            // Handle form submission logic here
        }
    };

    return (
        <form className="credit-card-form" onSubmit={handleSubmit}>
            <div className="card-details">
                <label htmlFor="card-number">Card Number</label>
                <div className="card-number">
                    <input
                        className='card-input'
                        type="text"
                        id="card-number"
                        value={cardNumber}
                        onChange={(evt) => setCardNumber(evt.currentTarget.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        required
                    />
                </div>
                <label htmlFor="expiry-date">Expiry Date</label>
                <div className="card-expiry">
                    <input
                        className='card-input'
                        type="month"
                        id="expiry-date"
                        value={expiryDate}
                        onChange={(evt) => setExpiryDate(evt.currentTarget.value)}
                        required
                    />
                </div>
                <label htmlFor="cvc">CVV</label>
                <div className="card-cvc">
                    <input
                        className='card-input'
                        type="text"
                        id="cvc"
                        value={cvv}
                        onChange={(evt) => setCvv(evt.currentTarget.value)}
                        placeholder="123"
                        maxLength="3"
                        required
                    />
                </div>
            </div>
            <div className="card-submit">
                <button type="submit">Submit Payment</button>
            </div>
        </form>
    );
}
