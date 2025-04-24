import './sidebar.css'

function Sidebar({latitude, longitude, sunset, sunrise, message}){

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
                    <h3>SUNRISE: { sunset }</h3>
                </li>
                <li>
                    <h3>SUNSET: { sunrise }</h3>
                </li>
            </ul>
            <p>{message}</p>
        </div> 
    )
}

export default Sidebar
