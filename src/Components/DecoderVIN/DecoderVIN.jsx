import classes from "./DecoderVIN.module.css";
import { useState } from "react";

function DecoderVIN() {
  const [vin, setVin] = useState("");
  const [vehicleData, setVehicleData] = useState();
  const [history, setHistory] = useState([]);

  const onClick = async (e) => {
    if (vin.length !== 17) return;
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
    );
    const result = await res.json();

    setHistory((current) => [
      { vin, time: new Date() },
      ...current.slice(0, 4),
    ]);

    const vehicleData = getVehicleData(result);
    setVehicleData(vehicleData);
  };

  const getVehicleData = (data) => {
    if (!data) throw new Error("no vehicle data");

    return data.Results.reduce((obj, { Value, Variable }) => {
      if (!!Value && !!Variable) obj[Variable] = Value;
      return obj;
    }, {});
  };

  const getVehicleDisplay = (vehicleData) =>
    Object.entries(vehicleData).reduce(
      (str, [variable, value]) => (str += `${variable}:${value}\n`),
      ""
    );

  return (
    <div className={classes.decoderContainer}>
      <div className={classes.sendInfo}>
        <div className={classes.inputArea}>
          <input type="text" placeholder="Input VIN code" value={vin} onChange={(e) => setVin(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={onClick}>Submit</button>
        </div>
        <ol>
          {history.map(({ vin, time }) => (
            <li
              key={`${vin}-${time.valueOf()}`}
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => setVin(vin)}
            >
              {vin} at {time.toLocaleString()}
            </li>
          ))}
        </ol>
      </div>
      <div className={classes.GetInfo}>
        <textarea
          rows="15"
          cols="100"
          placeholder="Vehicle Data Presented Here"
          value={vehicleData && getVehicleDisplay(vehicleData)}
        ></textarea>
      </div>
    </div>
  );
}

export default DecoderVIN;
