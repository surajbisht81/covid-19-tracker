import React from 'react';
import "./Map.css";
import { Marker, MapContainer, TileLayer, useMap } from "react-leaflet";
import { showDataOnMap } from "./util";
import L from "leaflet";

const markerIcon =  new L.Icon({
    iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize: [35, 45],
});

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

function Map({ caseType, countries, center, zoom }) {

    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} >
                <ChangeView center={center} zoom={zoom} /> 
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright"> openStreetMap </a> contributors' 
                />
                <Marker position={center} icon={markerIcon} >
                   { showDataOnMap(countries, caseType) }
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
