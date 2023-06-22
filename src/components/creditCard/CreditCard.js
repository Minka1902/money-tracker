import React, { useState } from 'react';
import './creditCard.css';

export default function CreditCardForm2() {
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
};
