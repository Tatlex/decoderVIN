import React from "react";
import classes from "./Main.module.css";
import {NavLink} from "react-router-dom";

function Main() {
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <div className={classes.containerChild}>
                    <NavLink to="/decoderVIN" className={classes.mainLink}>Decode VIN</NavLink>
                </div>
                <div className={classes.containerChild}>
                    <NavLink to="/list" className={classes.mainLink}>Get Vehicle Variables List</NavLink>
                </div>
            </div>
        </div>
    )

}


export default Main;
