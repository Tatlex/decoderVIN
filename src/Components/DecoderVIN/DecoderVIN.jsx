import classes from "./DecoderVIN.module.css";
import $ from 'jquery';

window.$ = $;

function DecoderVIN() {
    return (
        <div className={classes.decoderContainer}>
            <div className={classes.sendInfo}>
                <div className={classes.inputArea}>
                    <input id="vin_input" type="text" placeholder="Input VIN code"/>
                </div>
                <div>
                    <button id="btn_VIN_submit">Submit</button>
                </div>
            </div>
            <div className={classes.GetInfo}>
                <textarea id="txt_results" rows="15" cols="100" placeholder="Vehicle Data Presented Here"></textarea>
            </div>
        </div>
    )
}


window.onload = function () {
    document.getElementById("btn_VIN_submit").onclick = function () {
        let vin = document.getElementById("vin_input").value;
        if (vin.length === 17) {
            getDataByVIN(vin);
        } else {
            alert("Invalid input, please try again");
        }
    };

    function getDataByVIN(vin) {
        $.ajax({
            url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesBatch/",
            type: "POST",
            data: {format: "json", data: vin},
            dataType: "json",
            success: function (result) {
                console.log(result);
                displayResults(result);
            },
            resultError: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
            }
        });
    }

    function displayResults(data) {
        let output_text = "";

        for (let i = 0; i < data.Results.length; i++) {
            let result = data.Results[i];

            for (let prop in result) {
                if (result.hasOwnProperty(prop) && result[prop] !== "") {
                    output_text += prop + ": " + result[prop] + "\n";
                }
            }
        }
        document.getElementById("txt_results").value = output_text;
    }
}


export default DecoderVIN;
