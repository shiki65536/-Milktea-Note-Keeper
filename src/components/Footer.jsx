import React from "react";

function Footer(){
    const year = new Date().getFullYear();

    return (
        <footer>
            <small>Designed by planet16bit</small>
            <p>copyright 2021 ~ {year}</p>
        </footer>
    );
}
export default Footer;