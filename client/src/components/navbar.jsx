import React from 'react';
import {Link} from "react-router-dom"

const Navbar = () => {
    return ( 
        <nav className="myNavbar navbar-expand-lg navbar-dark">
            <div className="collapse navbar-collapse" >
                <ul className="navbar-nav">
                <li className=" active ">
                    <Link className="nav-link" to='/home'>HOME</Link>
                </li>
                <li >
                    <Link className="nav-link" to='/about'>ABOUT</Link>
                </li>
                <li>
                    <Link className="nav-link" to='/login'>LOGIN</Link>
                </li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;