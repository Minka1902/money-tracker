import React from 'react';
import { useHistory } from 'react-router-dom';

export default function NavBar(props) {
    const { buttons, isLoggedIn } = props;
    const history = useHistory();
    const [buttonCheckedName, setButtonCheckedName] = React.useState('Home');

    const determineIsAllowed = (button) => {
        if (isLoggedIn) {
            return true;
        } else {
            if (button.isAllowed) {
                return true;
            }
        }
        return false;
    };

    const buttonClick = (button) => {
        setButtonCheckedName(button.name);
        button.onClick();
    };

    React.useEffect(() => {
        const listen = history.listen((location) => {
            for (let i = 0; i < buttons.length; i++) {
                if (location.pathname === buttons[i].path) {
                    setButtonCheckedName(buttons[i].name);
                }
            }
        });

        return listen;
    }, []);

    return (
        <nav className="navigation-bar">
            <ul className="navigation-bar__list">
                {buttons.map((button, index) => {
                    return <li className="navigation-bar__item" key={index}>
                        <button
                            className={`navigation-bar__button${buttonCheckedName === button.name ? ' checked' : ''}
                            ${!determineIsAllowed(button) ? ' none' : ''}`}
                            onClick={() => buttonClick(button)}
                            key={index}
                        >
                            {button.name}
                        </button>
                    </li>
                })}
            </ul>
        </nav>
    );
};
