import React from 'react';
import DefaultGroup from '../../images/default-group.svg';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { formatDate, capitalizeFirstWord, formatAmount } from '../../constants/functions';

export function WhatsappMessage({ sender, messageBody }) {
    return (
        <div className="message__container">
            <div className="sender-info__container">
                <img className="avatar__image" src={sender.avatar ? sender.avatar : DefaultGroup} alt={sender.name ? sender.name : sender.phoneNumber} />
                <div className="message__header">
                    <h3 className="sender__name">{sender.name ? sender.name : sender.phoneNumber}</h3>
                    <div>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                </div>
            </div>
            <div className="message__content">
                <h3 className="message__body">{messageBody}</h3>
            </div>
        </div>
    );
};

export function EntryMessage({ entry }) {
    const currentUser = React.useContext(CurrentUserContext);
    const { time, amount, spentAt, currency, comment } = entry;

    return (
        <div className="entry-card" id={entry._id}>
            <div className="entry-card-header">
                <span className="entry-card-time">{formatDate(time)}</span>
                <span className="entry-card-owner">{currentUser.username}</span>
            </div>
            <div className="entry-card-body">
                <div className="entry-card-details" title={`${amount} ${currency}`}>
                    <span className="entry-card-amount">{formatAmount(amount.toString())}</span>
                    <span className="entry-card-currency">{currency}</span>
                </div>
                <div className="entry-card-description">
                    <span className="entry-card-spent-at" title={spentAt}>Spent at: <span className='capitalize'>{spentAt}</span></span>
                    {comment !== "No comment." ? <span className="entry-card-comment" title={comment}>Comment: {capitalizeFirstWord(comment)}.</span> : <></>}
                </div>
            </div>
        </div>
    );
};
