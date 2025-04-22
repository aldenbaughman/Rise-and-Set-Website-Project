import './map.css'
import 'leaflet/dist/leaflet.css'

import { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'
import  Sidebar  from '../sidebar/sidebar'

import { useGeolocated } from "react-geolocated";

const userLocation = [42.350876, -71.106918]
/*
const userLocation = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    return isGeolocationAvailable ? (
            isGeolocationEnabled ? (
                coords ? (
                    [coords.latitude, coords.longitude]
                ):[1,2]
            ):[2,3]
        ):[3,4]
}
*/


function Map() {
    var [position, setPosition] = useState(userLocation)
    var [latitude, setLatitude] = useState(userLocation[0])
    var [longitude, setLongitude] = useState(userLocation[1])

    function LocateUser(){
        var popup = L.popup()
        const map = useMapEvents({
            preclick(e){
                map.locate()
            },
            locationfound(e){
                setPosition(e.latlng)   
                map.flyTo(e.latlng, map.getZoom())
                setLatitude(e.latlng.lat)
                setLongitude(e.latlng.lng)
            }

        })
        return (
            <Marker position={position}>
                <Popup>YOOOOO</Popup>
            </Marker>
        )
    }
    
    function MapClick() {
        const map = useMapEvents({
            click(e){
                setPosition(e.latlng)   
                map.flyTo(e.latlng, map.getZoom())
                setLatitude(e.latlng.lat)
                setLongitude(e.latlng.lng)
            }
        })
        return (
            <Marker position={position}>
                <Popup>Dont touch me</Popup>
            </Marker>
        )
      }

    return(
        <div id ="mapandsidebar">
            <div id = "sidebar">
                <Sidebar 
                    latitude = {latitude}
                    longitude = {longitude}/>
            </div>
            <div id = "map">
                <MapContainer center={userLocation} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClick/>
                </MapContainer>
            </div>
        </div>
    )
}

export default Map