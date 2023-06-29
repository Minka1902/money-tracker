import './cards.css';
import React from 'react';
import photo from './michaelScharff.jpeg';
import { SvgFacebook, SvgWIFI, SvgLinkedIn, SvgGithub } from '../../images/SvgComponents';
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

const defPerson = { name: 'JOHN DOE', title: 'Fullstack dev, UX UI', image: '', social: {} };
export function CardPerson({ person = defPerson, onClick }) {
    return (
        <>
            <div class="card">
                <img class="card-photo" src={photo} onClick={onClick} />
                <div class="card-title">{person.name} <br />
                    <span>{person.title}</span>
                </div>
                <div class="card-socials">
                    <button class="card-socials-btn facebook">
                        <SvgFacebook />
                        {/* <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" id="Layer_21" height="24" data-name="Layer 21"><title></title><path d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"></path></svg> */}
                    </button>
                    <button class="card-socials-btn github">
                        <SvgGithub />
                        {/* <svg viewBox="0 0 24 24" height="33" width="33" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg> */}
                    </button>
                    <button class="card-socials-btn linkedin">
                        <SvgLinkedIn />
                        {/* <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m51.326 185.85h90.011v270.872h-90.011zm45.608-130.572c-30.807 0-50.934 20.225-50.934 46.771 0 26 19.538 46.813 49.756 46.813h.574c31.396 0 50.948-20.814 50.948-46.813-.589-26.546-19.551-46.771-50.344-46.771zm265.405 124.209c-47.779 0-69.184 26.28-81.125 44.71v-38.347h-90.038c1.192 25.411 0 270.872 0 270.872h90.038v-151.274c0-8.102.589-16.174 2.958-21.978 6.519-16.174 21.333-32.923 46.182-32.923 32.602 0 45.622 24.851 45.622 61.248v144.926h90.024v-155.323c0-83.199-44.402-121.911-103.661-121.911z"></path></svg> */}
                    </button>
                </div>
            </div>
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
                            <SvgWIFI color={'white'} is4={true} />
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
