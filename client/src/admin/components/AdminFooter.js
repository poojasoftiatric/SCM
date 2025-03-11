import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-bottom">
                &copy; {currentYear} @Sofiiatric IT Services - All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
