import React from "react";
import { useTheme } from "../hooks/useTheme"
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import Brightness4Icon from '@mui/icons-material/Brightness4';

function Header() {
    const { changeColor, changeMode, mode } = useTheme()

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }

    return (
        <header className='header'>
            <div>
                <h1>
                    <EmojiFoodBeverageIcon />
                    Milktea Note Keeper
                </h1>
            </div>
            <div>

                <Brightness4Icon onClick={toggleMode} style={{ filter: mode === 'dark' ? 'invert(0%)' : 'invert(5%)' }}
                    alt="dark/light toggle icon" />
            </div>


        </header>
    );
}

export default Header;