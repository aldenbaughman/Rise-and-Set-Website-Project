import './map.css'
import 'leaflet/dist/leaflet.css'

import { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, Popup} from 'react-leaflet'


function Map() {
    const [position, setPosition] = useState([42.350876, -71.106918])

    function LocateUser(){
        var popup = L.popup()
        const map = useMapEvents({
            preclick(e){
                map.locate()
            },
            locationfound(e){
                setPosition(e.latlng)   
                map.flyTo(e.latlng, 13)
                popup
                .setLatLng(e.latlng)
                .setContent("Youre Position is: " + e.latlng.toString())
                .openOn(map)
            }

        })
        return (
            <Marker position={position}>
                <Popup>Your location is {position.toString}</Popup>
            </Marker>
        )
    }
    
    function MyComponent() {
        var popup = L.popup()
        const map = useMapEvents({
            click(e){
                setPosition(e.latlng)
                map.flyTo(e.latlng, 13)
                
            }
        })
        //CRASHES WHEN THIS MARKER IS CLICKED
        return (
            <Marker position={position}>

                <Popup>You Clicked at {position.toString}</Popup>
            </Marker>
        )
      }

    return(
        <div id ="mapandsidebar">
            <div id="sidebar">
                <ul>
                    <li>
                        <h1>LAT: </h1>
                    </li>
                    <li>
                        <h1>LONG: </h1>
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
                    <MyComponent/>
                </MapContainer>
            </div>
        </div>
    )
}

export default Map