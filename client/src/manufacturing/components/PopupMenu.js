// PopupMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/popupMenu.css';

const PopupMenu = ({ options }) => {
    return (
        <div className="popup-menu">
            {options.map((option, index) => (
                <Link key={index} to={option.path} className="popup-link">
                    {option.label}
                </Link>
            ))}
        </div>
    );
};

export default PopupMenu;
