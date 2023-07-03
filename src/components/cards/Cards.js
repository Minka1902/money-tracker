import './cards.css';
import React from 'react';
import photo from '../../images/michaelScharff.jpeg';
import * as Svg from '../../images/SvgComponents';
import { formatCreditCardNumber } from '../../constants/functions';

const defProduct = { title: 'Product title', price: 123, description: 'Product description. Lorem ipsum dolor sit amet, consectetur adipisicing elit.', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRWifkO7X_yy9ojqDlG3YheD-iNku776zxxwlWzHPxYLwkIhSuLvjBZhq9uo5D5Af6nlMlqw-BKOxMTD4r5vp2uYaBXGKHuW-NldNMRIrKMVSedq0CSIRg0IACV7OKGCaC9eH8&usqp=CAc' }
export function CardProduct1({ product = defProduct, onClick }) {
    return (
        <>
            <div className="card-product">
                <div className="card-product__image"><img className="img" src={product.image} /></div>
                <div className="card-product__title">{product.title}</div>
                <div className="card-product__description">{product.description}</div>
                <hr className="card-product__divider" />
                <div className="card-product__footer">
                    <div className="card-product__price">{product.price}</div>
                    <button className="card-product__button" onClick={onClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
                            <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                            <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                            <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

const defPerson = { name: 'JOHN DOE', title: 'Fullstack dev, UX UI', image: photo, social: { instagram: () => { console.log('instagram') }, linkedin: () => console.log('linkedin'), github: () => console.log('github') } };
export function CardPerson({ person = defPerson, isInstagram = true, isLinkedin = true, isGithub = true, isWhatsApp = false }) {
    const onButtonClick = (evt) => {
        const buttonClicked = getButton(evt.target);
        if (buttonClicked) {
            const classes = buttonClicked.className;
            if (classes.indexOf('instagram') !== -1) {
                window.open(person.social.instagram, '_blank', 'noopener,noreferrer');
            } else {
                if (classes.indexOf('linkedin') !== -1) {
                    window.open(person.social.linkedin, '_blank', 'noopener,noreferrer');
                } else {
                    if (classes.indexOf('github') !== -1) {
                        window.open(person.social.github, '_blank', 'noopener,noreferrer');
                    }
                }
            }
        }
    };

    const getButton = (element) => {
        if (element.nodeName.toLowerCase() === 'button') {
            return element;
        }
        return getButton(element.parentElement);
    };

    return (
        <>
            <div className="card-person">
                <img className="card-person__photo" src={person.image} />
                <div className="card-person__title"><span className='capitalized'>{person.name}</span> <br />
                    <span>{person.title}</span>
                </div>
                <div className="card-person__socials">
                    {isInstagram ? <button className="card-person__socials_btn social-instagram" onClick={onButtonClick}>
                        <Svg.SvgInstagram />
                    </button> : <></>}
                    {isGithub ? <button className="card-person__socials_btn social-github" onClick={onButtonClick}>
                        <Svg.SvgGithub />
                    </button> : <></>}
                    {isLinkedin ? <button button className="card-person__socials_btn social-linkedin" onClick={onButtonClick}>
                        <Svg.SvgLinkedIn />
                    </button> : <></>}
                    {isWhatsApp ? <button button className="card-person__socials_btn social-whatsapp" onClick={onButtonClick}>
                        <Svg.SvgWhatsApp />
                    </button> : <></>}
                </div>
            </div >
        </>
    );
};

const defCard = { company: 'Mastercard', cardNumber: '1111 2222 3333 4444', ownerName: 'michael scharff', expiry: '12/12', cvv: '123' }
export function CreditCard({ card = defCard, onClick, isFlipping }) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick(card._id);
    };

    return (
        <>
            <div className="flip-card" id={`${card._id}`} onClick={handleClick}>
                <div className={`flip-card-inner ${isFlipping ? 'flipping' : ''}`}>
                    <div className="flip-card-front">
                        <p className="credit__heading">{card.company ? card.company : 'isracard'}</p>
                        <svg viewBox="0 0 48 48" height="36" width="36" y="0px" x="0px" xmlns="http://www.w3.org/2000/svg" className="credit__logo">
                            <path d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" fill="#ff9800"></path><path d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" fill="#d50000"></path><path d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" fill="#ff3d00"></path>
                        </svg>
                        <div className='credit__chip'></div>
                        <div className='credit__wifi'>
                            <Svg.SvgWIFI color={'white'} is4={true} />
                        </div>
                        <p className="credit__number">{formatCreditCardNumber(card.cardNumber, true, 8)}</p>
                        <p className="credit__valid_thru">VALID THRU</p>
                        <p className="credit__date">{card.expiry}</p>
                        <p className="credit__name">{card.ownerName}</p>
                    </div>
                    {isFlipping ? <div className="flip-card-back">
                        <div className="credit__strip"></div>
                        <div className="mstrip"></div>
                        <div className="sstrip">
                            <p className="credit__code">{card.cvv ? card.cvv : '***'}</p>
                        </div>
                    </div> : <></>}
                </div>
            </div>
        </>
    );
};
