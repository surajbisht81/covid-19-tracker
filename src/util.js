
import React from "react";
import { Popup, Circle } from "react-leaflet";
import PopupContent from "./PopContent";
var numeral = require("numeral");

const caseTypeColors = {
    cases: {
       hex: "#CC1034",
       multiplier: 400,
    },
    recovered: {
       hex: "#7dd71d",
       multiplier: 800,
    },
    deaths: {
       hex: "#fb4443",
       multiplier: 1200,
    },
};

export const sortData = (data) => {

    const sortedData = [...data];

    sortedData.sort((a, b) =>{
        if(a.cases > b.cases) {
            return -1;
        }else {
            return 1;
        }
    })

    return sortedData;
}

export const showDataOnMap = (data, caseType) => (
    data.map( (country) => (
        
         <Circle
           center={[country.countryInfo.lat, country.countryInfo.long]}
           fillOpacity={0.4}
           color={caseTypeColors[caseType].hex}
           fillColor={caseTypeColors[caseType].hex}
           radius={Math.sqrt(country[caseType])/2 * caseTypeColors[caseType].multiplier}
         >
            <Popup>
                <PopupContent country={country} />
            </Popup>
         </Circle>
    ))
);

export const preety = (stats) => 
    stats ? `+${numeral(stats).format("0.0a")}` : `+0`;