import classes from "./DecoderVIN.module.css";
import React, {useState} from "react";

function DecoderVIN() {
    const [vin, setVin] = useState("");
    const [vehicleData, setVehicleData] = useState();
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState("");

    const onChange = (e) => {
        setMessage("");
        setVin(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let illegalChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (vin.length !== 17 || illegalChar.test(vin)) {
            setMessage("Invalid input");
            return;
        }
        const res = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
        );
        const result = await res.json();
        setMessage(result.Message);

        setHistory((current) => [
            {vin, time: new Date()},
            ...current.slice(0, 4),
        ]);

        const vehicleData = getVehicleData(result);
        setVehicleData(vehicleData);
    };

    const getVehicleData = (data) => {
        if (!data) throw new Error("no vehicle data");
        return data.Results.reduce((obj, {Value, Variable}) => {
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
        <form className={classes.decoderContainer} onSubmit={onSubmit}>
            <div className={classes.sendInfo}>
                <div className={classes.inputArea}>
                    <input type="text" placeholder="Input VIN code" value={vin} onChange={onChange}
                    />
                    <div style={{color: "red"}}>{message}</div>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </div>
            <div className={classes.historyInfo}>
                <ol>
                    {history.map(({vin, time}) => (
                        <li
                            key={`${vin}-${time.valueOf()}`}
                            style={{cursor: "pointer", color: "#0e0e53"}}
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
        </form>
    );
}

export default DecoderVIN;