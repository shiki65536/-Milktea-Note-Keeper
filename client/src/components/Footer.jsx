import React from "react";

function Footer(){
    const year = new Date().getFullYear();

    return (
        <footer>
            <small>Designed by shiki65536 © {year}</small>
        </footer>
    );
}
export default Footer;