import './map.css'
import 'leaflet/dist/leaflet.css'
import History from '../history/history'

import { useState, useEffect} from 'react'
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMapEvent } from 'react-leaflet'

import { useGeolocated } from "react-geolocated";
import { useAppContext } from '../../contexts/context'
import { latlngToCityCountry, GeminiLocationInfo } from '../../apis/apis'
import { makeNewCoord } from '../../reducer/actions/newCoord'


const centerLocation = [42.361145, -71.057083]

function Map() {
    /*
    var [position, setPosition] = useState(null)
    var [latitude, setLatitude] = useState(null)
    var [longitude, setLongitude] = useState(null)
    */

    const {appState, dispatch} = useAppContext();
    const info = ''


    function MapClick(){
        if (appState.location == null){
            const map = useMapEvents({
                click() {
                    map.locate()
                },
                locationfound(e) {
                    latlngToCityCountry(e.latlng.lat, e.latlng.lng, dispatch)
                    console.log(location)
                    //const info = GeminiLocationInfo(location)


                    map.flyTo(e.latlng, map.getZoom())
                },
                locationerror(){
                    latlngToCityCountry(e.latlng.lat, e.latlng.lng, dispatch)
                    //const info = GeminiLocationInfo(location)

                    dispatch(makeNewCoord({
                        lat: roundCoord(e.latlng.lat),
                        long: roundCoord(e.latlng.lng),
                        location: location,
                        info: info
                    }))
                }
            })
        }
        else{
            const map = useMapEvents({
            click(e){
                /*
                setPosition(e.latlng, this.position)   
                map.flyTo(e.latlng, map.getZoom())
                setLatitude(roundCoord(e.latlng.lat))
                setLongitude(roundCoord(e.latlng.lng))
                
                */
                latlngToCityCountry(e.latlng.lat, e.latlng.lng, dispatch)
                //const info = GeminiLocationInfo(location)
                /*
                dispatch(makeNewCoord({
                    lat: roundCoord(e.latlng.lat),
                    long: roundCoord(e.latlng.lng),
                    location: location,
                    info: info
                }))
                */
            }
        })
        }
        let {lat, long} = appState
        return (
            lat === undefined ? null: (
                <Marker position={[lat, long]}>
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
