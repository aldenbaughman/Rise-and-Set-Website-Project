import './sidebar.css'
import { getSunrise, getSunset } from 'sunrise-sunset-js';

function Sidebar({latitude, longitude}){
    
    return(
        <div id = "sidebar">
            <ul>
                <li>
                    <h1>LATITUDE: { latitude }</h1>
                </li>
                <li>
                    <h1>LONGITUDE: { longitude }</h1>
                </li>
                <li>
                    <h1>CITY: </h1>
                </li>
                <li>
                    <h1>SUNRISE: { getSunrise(latitude,longitude).getHours().toString() }:{getSunrise(latitude,longitude).getMinutes().toString()}</h1>
                </li>
                <li>
                    <h1>SUNSET: { getSunset(latitude,longitude).getHours().toString() }:{getSunset(latitude,longitude).getMinutes().toString()}</h1>
                </li>

            </ul>
        </div> 
    )
}

export default Sidebar
