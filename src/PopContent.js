import React from 'react';
import "./PopContent.css";
var numeral = require("numeral");

function PopContent({country}) {
    return (
        <div className="popup">
            <div className="popup__flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
            <div className="popup__country"> {country.country} </div>
            <div className="popup__cases"> Cases: {numeral(country.cases).format("0,0")} </div>
            <div className="popup__recovered"> Recovered: {numeral(country.recovered).format("0,0")} </div>
            <div className="popup__deaths"> Deaths: {numeral(country.deaths).format("0,0")} </div>
        </div>
    )
}

export default PopContent
