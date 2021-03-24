import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
var numeral = require("numeral");

const options = {
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRation: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

function LineGraph({caseType}) {

    const [data, setData] = useState({});

    // console.log("caseType upper is: ", caseType);
    const buildChartData = (data) => {
        // console.log(data);
        const chartData = [];
        let lastDataPoint;
        
        for(let date in data.cases)
        {
            // console.log("caseType lower is: ", x);
            if(lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint,
                };

                // console.log("new Data Point is: ", newDataPoint);
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[caseType][date];
        }
        // console.log(chartData[0]);
        return chartData;
    }

    useEffect(() => {

         fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
         .then((response) => response.json())
         .then((data) => {
            //   console.log(data);
              data = buildChartData(data, caseType);
            //   console.log(data);
              setData(data);
         })

    }, [caseType])
    
    return (
        <div>

            {data?.length > 0 && 
             (
                <Line 
                    data={ {
                        datasets: [{
                            data: data,
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: "#CC1034"
                        }]
                    }}
                    options={options}
                />  
             )
            }
        </div>
    )
}

export default LineGraph
