import React from 'react';
import './rightClickMenu.css';

let rightMenuOptions = [{ buttonText: 'log class list.', buttonClicked: (target) => console.log(`Logout: ${target}`) },];

export default function RightClickMenu({ items = rightMenuOptions, whatToReturn = 'classList' }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [evt, setEvt] = React.useState(undefined);
    const [menuItems, setMenuItems] = React.useState(items);

    const handleItemClick = (item) => {
        if (evt.target[whatToReturn]) {
            item.buttonClicked(evt.target[whatToReturn]);
        } else {
            item.buttonClicked(evt.target.classList);
        }
        setIsOpen(false);
    };

    const isLinks = (evt) => {
        const classes = evt.target.classList;
        for (let i = 0; i < classes.length; i++) {
            if (classes[i].indexOf('link') !== -1) {
                return true;
            }
        }
        return false;
    };

    // ! setting the position of the right click menu to the mouse position, opening the menu, and checking what menu should be opened
    React.useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
            if (isLinks(event)) {
                setMenuItems([{ buttonText: 'Open link in new tab', buttonClicked: () => window.open(event.target.href, "_blank") }]);
            } else {
                setMenuItems(items);
            }
            setEvt(event);
            setIsOpen(true);
            setPosition({ x: event.clientX, y: event.clientY });
        };

        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    //! closing the menu when the user clicks outside of it
    React.useEffect(() => {
        const closeMenu = (evt) => {
            if (!evt.target.classList.contains('menu-item') && !evt.target.classList.contains('right-click-menu')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, []);

    //! closing the menu when the user clicks the ESCAPE key
    React.useEffect(() => {
        const closeByEscape = (evt) => {
            if (evt.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', closeByEscape);
        return () => document.removeEventListener('keydown', closeByEscape);
    }, []);

    return (
        <div className={`right-click-menu ${isOpen ? 'open' : ''}`} style={{ top: position.y, left: position.x }}>
            {menuItems.map((item, index) => (
                <button
                    key={index}
                    className="menu-item"
                    onClick={() => handleItemClick(item)}
                >
                    {item.buttonText.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                </button>
            ))}
        </div>
    );
};
