import './map.css'
import 'leaflet/dist/leaflet.css'

import { useState } from 'react'
import { MapContainer, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'


function Map() {
    function MyComponent() {
        const [position, setPosition] = useState(null)
        var popup = L.popup()
        const map = useMapEvents({
            click(e){
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
                popup
                .setLatLng(e.latlng)
                .setContent("You Clicked the map at: " + e.latlng.toString())
                .openOn(map)
            }
        })
        return
      }

    return(
        <MapContainer center={[42.350876, -71.106918]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent/>
        </MapContainer>
    )
}

export default Map