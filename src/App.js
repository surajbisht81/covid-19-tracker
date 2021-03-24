import React, { useState, useEffect } from 'react'
import "./App.css";
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData } from "./util"
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const [mapCenter, setMapCenter] = useState({lat: 54, lng: -2});
  const [mapZoom, setMapZoom] = useState(4);

  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState("cases");

  // when someone first opens the Covid Tracker, It will show him the cases from woldwide, for that 
  // useEffect is used so that when app gets loaded then it should show him worldwide cases

  useEffect(() => {
    
        fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
           setCountryInfo(data);
        });

  }, [])

  // On clicking the particular country we will get the data and it will show on the InfoBox

  const onCountryChange = async (event) => {
        console.log(event);
          const countryCode = event.target.value;

          const url = countryCode === "WorldWide" ?  "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

          await fetch(url)
                .then((response) => response.json())
                .then((data) => {

                     setCountry(countryCode);
                     setCountryInfo(data);
                    //   console.log(data);
                    //   console.log(data.countryInfo.lat);
                    //   console.log(data.countryInfo.long);
                     setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                     setMapZoom(5);

                });
  }

  useEffect( () => {
     
    const getCountriesData = async () => {
      
         await fetch("https://disease.sh/v3/covid-19/countries")
               .then( (response) => response.json())
               .then( (data) => {
                   const countries = data.map( country => (
                     {
                       name: country.country,
                       value: country.countryInfo.iso2
                     }));
                    setCountries(countries);
                    
                    const sortedData = sortData(data);
                    setTableData(sortedData);

                    setMapCountries(data);
               });
    }
    
    getCountriesData();
  }, []);



  return (
     <div className="app">
         
         <div className="app__left">
              {/* {header} */}
             <div className="app__header">

                 <h1>Covid 19 Tracker</h1>

                 <FormControl className="app__dropdown">
                      <Select variant="outlined" value={country} onChange={onCountryChange}>
                           <MenuItem value="WorldWide"> WorldWide </MenuItem>
                           {
                            countries.map( country => (
                            <MenuItem value={country.value}> {country.name} </MenuItem>
                            ))
                           }
                      </Select>
                 </FormControl>
              </div>

              <div className="app__stats">
                  <InfoBox active={caseType==="cases"} isRed onClick={e=> setCaseType("cases")} title="CoronaVirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
                  <InfoBox active={caseType==="recovered"}onClick={e=> setCaseType("recovered")} title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
                  <InfoBox active={caseType==="deaths"} isRed onClick={e=> setCaseType("deaths")} title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
              </div>

              <Map caseType={caseType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
         </div>
         
         <div className="app__right">
            <Card>
                <CardContent>
                     <h3> Live Cases by Country </h3>
                     <Table countries={tableData} />
                     <h3> Worldwide new {caseType} </h3>
                </CardContent>
                
                <LineGraph caseType={caseType} />
            </Card>
         </div>
     </div>
  );
}

export default App;