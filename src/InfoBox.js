import React from 'react';
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";
import {preety} from "./util";


function InfoBox({active, isRed, title, cases, total, ...props}) {
    return (
            <Card onClick={props.onClick} className={`infoBox ${active && "infoBox__selected"}`}>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary"> {title} </Typography>

                    <h2 className={`infoBox__cases ${!isRed && "infoBox__cases__green" } `}> {preety(cases)} </h2>

                    <Typography className="infoBox__total" color="textSecondary"> {preety(total)} Total </Typography>
                </CardContent>
            </Card>
    )
}

export default InfoBox
