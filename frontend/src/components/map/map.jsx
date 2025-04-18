import './map.css'
import 'leaflet/dist/leaflet.css'

import { MapContainer, TileLayer} from "react-leaflet"

function Map() {
    return(
        <MapContainer center={[42.350876, -71.106918]} zoom={16}>
            <TileLayer
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <div id="map"></div>
        </MapContainer>
    )
}

export default Map