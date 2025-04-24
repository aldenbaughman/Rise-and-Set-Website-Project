import './sidebar.css'
import { getSunrise, getSunset } from 'sunrise-sunset-js';

function Sidebar({latitude, longitude, message}){

    return(
        <div id = "sidebar">
            <ul>
                <li>
                    <h3>LATITUDE: { latitude }</h3>
                </li>
                <li>
                    <h3>LONGITUDE: { longitude }</h3>
                </li>
                <li>
                    <h3>CITY: </h3>
                </li>
                <li>
                    <h3>SUNRISE: { getSunrise(latitude,longitude).getHours() }:{(getSunrise(latitude,longitude).getMinutes() < 10 ? ('0' + getSunrise(latitude,longitude).getMinutes().toString()):getSunrise(latitude,longitude).getMinutes().toString())}</h3>
                </li>
                <li>
                    <h3>SUNSET: { getSunset(latitude,longitude).getHours().toString() }:{(getSunrise(latitude,longitude).getMinutes() < 10 ? ('0' + getSunrise(latitude,longitude).getMinutes().toString()):getSunrise(latitude,longitude).getMinutes().toString())}</h3>
                </li>
            </ul>
            <p>{message}</p>
        </div> 
    )
}

export default Sidebar
