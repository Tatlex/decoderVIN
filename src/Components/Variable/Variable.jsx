import classes from "./Variable.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Variable() {
  const { id } = useParams();
  const [variableData, setVariableData] = useState();

  useEffect(() => {
    fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablevalueslist/${id}?format=json`
    )
      .then((res) => res.json())
      .then((json) => setVariableData(json.Results));
  }, [id]);

  return variableData && variableData.length ? (
    <div className={classes.details}>
      <h1>{variableData[0].ElementName}</h1>
      <ul style={{ color: "#0e0e53" }}>
        {variableData.map((variable) => (
          <li key={variable.Id}>
            <h4>{variable.Name}</h4>
          </li>
        ))}
      </ul>
    </div>
  ) : (
      <div>
    <h1 className={classes.noDetails}>No details available</h1>
      </div>
  );
} 

export default Variable;
