import { useAppContext } from '../../contexts/context'
import './sidebar.css'

function Sidebar(){
        
    const {appState, dispatch} = useAppContext();
    
    const {lat, long, location, sunrise, sunset, info} = appState

    return(
        
        <div className = "sidebar">
            <ul>
                <li>
                    <h3>LATITUDE: { lat }</h3>
                </li>
                <li>
                    <h3>LONGITUDE: { long }</h3>
                </li>
                <li>
                    <h3>LOCATION: { location }</h3>
                </li>
                <li>
                    <h3>SUNRISE: { sunrise }</h3>
                </li>
                <li>
                    <h3>SUNSET: { sunset}</h3>
                </li>
            </ul>
            <h2>Loocation Summary:</h2>
            <p> {info} </p>
    </div>

    )
}

export default Sidebar
