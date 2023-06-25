import React from "react";

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