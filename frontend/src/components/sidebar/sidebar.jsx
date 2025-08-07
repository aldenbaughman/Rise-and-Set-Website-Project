import './sidebar.css'

import { useState, useEffect, useRef } from 'react'

import { getSunrise, getSunset } from 'sunrise-sunset-js';

//import fetch from 'node-fetch';


function Sidebar({latitude, longitude, location, geminiResponse}){
    //THESE SPECIFICALLY LOCATION UPDATES A CLICK LATE
   
    //UDATES A CLICK LATE, ALSO LATE IF YOU SPAM IT IE RTT TIME


    var[historyElem, setHistoryElem] = useState([])
    
    var [dbHistory, setDbHistory] = useState([])

    
    function DateToTime(date){
        return date.getHours().toString() + ":" + (date.getMinutes() < 10 ? 
                                                        ('0' + date.getMinutes().toString()) : 
                                                        date.getMinutes().toString())
    }

     //add onclick here to function in map that sets lat long and location!!!!!!!!!!!
        function HistoryElement({latitude, longitude, city}){
            return (
                <>
                <button className ='historyElement'>
                    
                        <p>LAT: {latitude}</p>
                        <p>LONG: {longitude}</p>
                        <p>CITY: {location}</p>
                </button>
                </>
            )
        }
    
        //Use effect every time history sidebar is toggled
        /*useEffect(() =>{
            fetch('http://localhost:8888/history')
                .then(res => res.json())
                .then(data => {
                    let newDbHistory = []
                        for (let i = 0; i < data.length; i++){
                            newDbHistory.push(data[i])
                        }
                        setDbHistory(newDbHistory)
                        console.log(dbHistory)
                })
        }, [])*/
    
        function clearHistory(){
            try{
                console.log('[BACKEND] Deleting History')
                const response = fetch('http://localhost:8888/clear')
                console.log('[BACKEND] History Deleted')
                console.log(response)
    
                if (!response.ok){
                    throw new Error('Oops, something went wrong w/ response while deleting history')
                }
            }catch (error){
                console.error(error)
                return 'Oops, something went wrong! with entire thing'
            }
            
        }

        /*<!-- --!>
            <p id = "CityName">  {message.split('|', 2)[0]}</p>
            <p classname ="smalltext">{message.split('|', 2)[1]}</p> */

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
                    <h3>CITY: { location }</h3>
                </li>
                <li>
                    <h3>SUNRISE: { DateToTime(getSunrise(latitude,longitude))}</h3>
                </li>
                <li>
                    <h3>SUNSET: { DateToTime(getSunset(latitude,longitude)) }</h3>
                </li>
            </ul>
            <p> {geminiResponse} </p>
            
            
        <h2>History</h2>
        <button id="clearButton" onClick= {() => clearHistory()}>
        Clear History
    </button>
        {dbHistory.map((object) => {
            return(<HistoryElement latitude = {object.latitude}
                longitude = {object.longitude}
                location = {object.location}/>)
            })}
    </div>

    )
}

export default Sidebar
