import React, {useEffect, useRef} from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import fireTruck from "./icons/vehicleKind/fireTruck.svg";
import policeStation from "./icons/vehicleKind/policeCar.svg";
import ambulance from "./icons/vehicleKind/ambulance.svg";
import incendie from "./icons/incidentKind/INCENDIE.svg";
import accident from "./icons/incidentKind/ACCIDENT.svg";
import agression from "./icons/incidentKind/AGGESSION.svg";
import {Loader} from "../Loaders/Loader";

const vehicleKind = {
    FIRE_TRUCK: {
        icon: fireTruck,
        color: 'red'
    },
    POLICE_STATION: {
        icon: policeStation,
        color: 'blue'
    },
    AMBULANCE: {
        icon: ambulance,
        color: 'green'
    }
}
const incidentKind = {
    INCENDIE: incendie,
    ACCIDENT: accident,
    AGGRESSION: agression,
}
const Itinerary = ({className, data, isLoading}) => {
    const mapRef = useRef(null);


    useEffect(() => {
        if (mapRef.current && mapRef.current.children.length > 0) {
            return;
        }
        if (!data.success) {
            return;
        }

        const map = L.map(mapRef.current, {attributionControl: false}).setView([32.8902554769109, -6.909138668081790], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);


        data.data.forEach(
            vehicle => {
                console.log(vehicleKind[vehicle.typeVehicle])
                L.marker([vehicle.path[0].latitude, vehicle.path[0].longitude], {
                    icon: L.icon({
                        iconUrl: vehicleKind[vehicle.typeVehicle].icon,
                        iconSize: [38, 95],

                    })
                }).addTo(map)
                const last = vehicle.path.length - 1;
                L.marker([vehicle.path[last].latitude, vehicle.path[last].longitude], {
                    icon: L.icon({
                        iconUrl: incidentKind[vehicle.typeIncident],
                        iconSize: [38, 95],

                    })
                }).addTo(map)


                L.polyline(vehicle.path.map(value => [value.latitude, value.longitude]),
                    {color: vehicleKind[vehicle.typeVehicle].color}).addTo(map);
            }
        )

    }, [data]);

    return isLoading ? <Loader center={true}/> : <div id="map" className={`${className} leaflet-container`} ref={mapRef}></div>;
};


export default Itinerary;
