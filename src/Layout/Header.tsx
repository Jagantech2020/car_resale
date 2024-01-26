import React from "react"
import { NavLink } from "react-router-dom"
import "./Layout.css";
const Header:React.FC = () => {
    return(
        <>
        <header className="d-flex justify-between">
            <div><NavLink to="/">Logo</NavLink></div>
            <nav>
                <ul>
                    <li><NavLink to="/home"> Home</NavLink></li>
                    <li><NavLink to="/service"> Services</NavLink></li>
                    <li><NavLink to="/contact"> Contact</NavLink></li>
                    <li><NavLink to="/gallery"> gallery</NavLink></li>
                </ul>
            </nav>
        </header>
       
        </>
    )
}

export default Header;