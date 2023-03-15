import classes from "./List.module.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function VariablesList() {
    const [variables, setVariables] = useState([]);

    useEffect(() => {
        fetch(
            "https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json"
        )
            .then((res) => res.json())
            .then((json) => setVariables(json.Results));
    }, []);

    return (
        <div className={classes.decoderContainer}>
            <ul style={{color: "#0e0e53"}}>
                {variables.map((variable) => (
                    <li key={variable.ID}>
                        <h3>
                            <Link style={{color: "black"}} to={`/variables/${variable.ID}`}>{variable.Name}</Link>
                        </h3>
                        <p dangerouslySetInnerHTML={{__html: variable.Description}}></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VariablesList;
