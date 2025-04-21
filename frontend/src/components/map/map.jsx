import './map.css'
import 'leaflet/dist/leaflet.css'

import { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, Popup} from 'react-leaflet'


function Map() {
    var [position, setPosition] = useState([42.350876, -71.106918])
    var [latitude, setLatitude] = useState(42.350876)
    var [longitude, setLongitude] = useState(-71.106918)

    function LocateUser(){
        var popup = L.popup()
        const map = useMapEvents({
            preclick(e){
                map.locate()
            },
            locationfound(e){
                setPosition(e.latlng)   
                map.flyTo(e.latlng, 13)
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
        var popup = L.popup()
        const map = useMapEvents({
            click(e){
                setPosition(e.latlng)   
                map.flyTo(e.latlng, 13)
                setLatitude(e.latlng.lat)
                setLongitude(e.latlng.lng)
            }
        })
        //CRASHES WHEN THIS MARKER IS CLICKED
        return (
            <Marker position={position}>
                <Popup>Dont touch me</Popup>
            </Marker>
        )
      }

    return(
        <div id ="mapandsidebar">
            <div id="sidebar">
                <ul>
                    <li>
                        <h1>LAT: { latitude }</h1>
                    </li>
                    <li>
                        <h1>LONG: { longitude }</h1>
                    </li>
                    <li>
                        <h1>CITY: </h1>
                    </li>

                </ul>

            </div>
            <div id = "map">
                <MapContainer center={[42.350876, -71.106918]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocateUser/>
                    <MapClick/>
                </MapContainer>
            </div>
        </div>
    )
}

export default Map