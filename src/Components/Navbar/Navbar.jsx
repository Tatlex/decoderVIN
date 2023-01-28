import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import image from "../Images/images.png";
import React from "react";

function Navbar() {
    return (
        <div className={classes.NavbarContainer}>
            <NavLink to="/"><img className={classes.image} src={image} alt="Home"/></NavLink>

            <NavLink to="/variables" >Get Vehicle Variables List</NavLink>
        </div>
    )
}

export default Navbar;