import React from 'react';

// ! buttons example
const defButtons = [
    {
        name: 'Home',
        isAllowed: true,
        onClick: () => {
            console.log('Home button clicked');
        },
    }
];

export default function NavBar(props) {
    const { buttons = defButtons, isLoggedIn } = props;

    const determineButton = (button) => {
        if (isLoggedIn) {
            return true;
        } else {
            if (button.isAllowed) {
                return true;
            }
        }
        return false;
    };

    return (
        <nav className="navigation-bar">
            <ul className="navigation-bar__list">
                {buttons.map((button, index) => (
                    determineButton(button) ?
                        <li className="navigation-bar__item" key={index}>
                            <button className={`navigation-bar__button ${determineButton(button) ? '' : 'none'}`} onClick={button.onClick} >
                                {button.name}
                            </button>
                        </li>
                        :
                        <></>
                ))}
            </ul>
        </nav>
    );
};
