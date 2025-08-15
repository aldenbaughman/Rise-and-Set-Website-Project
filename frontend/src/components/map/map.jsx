import './map.css'
import 'leaflet/dist/leaflet.css'
import History from '../history/history'

import { useState, useEffect} from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMapEvent } from 'react-leaflet'

import { useGeolocated } from "react-geolocated";

const centerLocation = [42.361145, -71.057083]

function Map({onChange}) {
    var [position, setPosition] = useState(null)
    var [latitude, setLatitude] = useState(null)
    var [longitude, setLongitude] = useState(null)

    function MapClick(){
        if (position == null){
            const map = useMapEvents({
                click() {
                    map.locate()
                },
                locationfound(e) {
                    onChange(e.latlng.lat, e.latlng.lng)
                    setPosition(e.latlng)
                    setLatitude(e.latlng.lat)
                    setLongitude(e.latlng.lng)

                    map.flyTo(e.latlng, map.getZoom())
                    onChange(roundCoord(e.latlng.lat), roundCoord(e.latlng.lng))
                },
                locationerror(){
                    onChange(centerLocation[0], centerLocation[1])
                    setPosition(centerLocation)
                    setLatitude(centerLocation[0])
                    setLongitude(centerLocation[1])
                    onChange(roundCoord(e.latlng.lat), roundCoord(e.latlng.lng))
                }
            })
        }
        else{
            const map = useMapEvents({
            click(e){
                setPosition(e.latlng, this.position)   
                map.flyTo(e.latlng, map.getZoom())
                setLatitude(roundCoord(e.latlng.lat))
                setLongitude(roundCoord(e.latlng.lng))
                
                onChange(roundCoord(e.latlng.lat), roundCoord(e.latlng.lng))
            }
        })
        }
        return (
            position === null ? null: (
                <Marker position={position}>
                    <Popup>Dont touch me</Popup>
                </Marker>
            )
        )
    }

    function roundCoord(coord){
        return Math.round(coord * 1000000) / 1000000
    }

    return(
        <div id ="mapandsidebar">
            
            <div id = "map">
                <MapContainer center={centerLocation} zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                        noWrap={true}
                    />
                    <MapClick/>
                </MapContainer>
            </div>
    </div>
    )
}

export default Map
