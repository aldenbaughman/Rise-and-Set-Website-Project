import './sidebar.css'

import { useState, useEffect, useRef } from 'react'

import { getSunrise, getSunset } from 'sunrise-sunset-js';

//import fetch from 'node-fetch';


function Sidebar({latitude, longitude, location, geminiResponse}){
        
    function DateToTime(date){
        return date.getHours().toString() + ":" + (date.getMinutes() < 10 ? 
                                                        ('0' + date.getMinutes().toString()) : 
                                                        date.getMinutes().toString())
    }

    return(
        
        <div className = "sidebar">
            <ul>
                <li>
                    <h3>LATITUDE: { latitude }</h3>
                </li>
                <li>
                    <h3>LONGITUDE: { longitude }</h3>
                </li>
                <li>
                    <h3>LOCATION: { location }</h3>
                </li>
                <li>
                    <h3>SUNRISE: { DateToTime(getSunrise(latitude,longitude))}</h3>
                </li>
                <li>
                    <h3>SUNSET: { DateToTime(getSunset(latitude,longitude)) }</h3>
                </li>
            </ul>
            <h2>Loocation Summary:</h2>
            <p> {geminiResponse} </p>
    </div>

    )
}

export default Sidebar
