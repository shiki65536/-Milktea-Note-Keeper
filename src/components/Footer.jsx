import React from "react";

function Footer(){
    const year = new Date().getFullYear();

    return (
        <footer>
            <small>Designed by planet16bit © 2021 ~ {year}</small>
        </footer>
    );
}
export default Footer;