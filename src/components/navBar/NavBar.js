import React from 'react';

export default function NavBar(props) {
    const { buttons, isLoggedIn } = props;
    const [buttonCheckedName, setButtonCheckedName] = React.useState('Home');

    const determineButtonClass = (button) => {
        const determineButton = () => {
            if (isLoggedIn) {
                return true;
            } else {
                if (button.isAllowed) {
                    return true;
                }
            }
            return false;
        };

        let classes = 'navigation-bar__button';
        if (!determineButton(button)) {
            classes += ' none';
        }
        if (buttonCheckedName === button.name) {
            classes += ' checked';
        }
        return classes;
    };

    const buttonClick = (button) => {
        setButtonCheckedName(button.name);
        button.onClick();
    }

    return (
        <nav className="navigation-bar">
            <ul className="navigation-bar__list">
                {buttons.map((button, index) => (
                    <li className="navigation-bar__item" key={index}>
                        <button
                            className={determineButtonClass(button)}
                            onClick={() => buttonClick(button)}
                            key={index}
                        >
                            {button.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
