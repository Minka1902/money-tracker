import React from 'react';

// ! buttons example
const defButtons = [
    {
        name: 'About',
        onClick: () => {
            // Function to handle about button click
            console.log('About button clicked');
        },
    }
];

export default function NavBar({ buttons = defButtons }) {
    return (
        <nav className="navigation-bar">
            <ul className="navigation-bar__list">
                {buttons.map((button, index) => (
                    <li className="navigation-bar__item" key={index}>
                        <button
                            className="navigation-bar__button"
                            onClick={button.onClick}
                        >
                            {button.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
