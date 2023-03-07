import {Link} from "react-router-dom";
import classes from "../ErrorPage/ErrorPage.module.css";
import React from "react";
import image from "../Images/banner.png";

function ErrorPage() {
    return (
        <div className={classes.errorPageContainer}>
            <div>
                <h1 className={classes.errorHeader}>Page not found</h1>
                <p className={classes.errorParagraph}>We're sorry, we couldn't find the page you requested</p>
                <Link to={'/'}>
                    <button>Return to home page</button>
                </Link>
            </div>
            <div className={classes.errorPicture}>
                <img  src={image} alt="Error"/>
            </div>
        </div>
    );
}


export default ErrorPage;