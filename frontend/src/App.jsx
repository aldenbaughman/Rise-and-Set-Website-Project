import Navbar from './components/navbar/navbar'

import './App.css'

import { useEffect, useState} from 'react'
import  Sidebar  from './components/sidebar/sidebar'
import  Map  from './components/map/map'
import { map } from 'leaflet'

function App() {
  const [mapCoords, setMapCoords] = useState({lat: 0.0, long: 0.0})
  const [location, setLocation] = useState('Waiting for input')
  const [geminiResponse, setGeminiResponse] = useState('Waiting for input')

  const handleLatLongChange  = (updatedLat, updatedLong) => {
    //Later look into what prevState Actually does 
    //setMapInfo((prevState) => ({...prevState, lat: updatedLat, long: updatedLong}))
    setMapCoords({lat: updatedLat, long: updatedLong})
    
    
  }

  useEffect(() => {
    latlngToCityCountry()
    console.log("location in handleLatLongChange: " + location)
  }, [mapCoords.lat, mapCoords.long])

  useEffect(() => {
    GeminiLocationInfo()
    console.log("geminiResponse in hanglelatlongchange: " + geminiResponse)
  }, [location])

  async function latlngToCityCountry(){
        try{
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${mapCoords.lat}&lon=${mapCoords.long}&zoom=18&addressdetails=1`
            console.log(url)

            //setLocation calls GemeniLocationInfo during setLocation so the inforation is presented at the same time the location changes
            fetch(url).then(res=>res.json()).then(data=>setLocation((data.address.city != undefined)?
                                                                    (data.address.city + ', ' + data.address.country):
                                                                    (data.address.country), () => {GemeniLocationInfo()})) 
            //setLocation("Los Angeles, California", () => {GemeniLocationInfo()})                                                        
            console.log("location in latlngToCityCOuntrly: " + location)
            
        } catch(error){
            console.error(error)
        }
  }

  async function GeminiLocationInfo(){
        try {
            const response = await fetch('http://localhost:8888/chat', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },  
                body: JSON.stringify({ location: location })
            })
            console.log(response.ok)  
            if (!response.ok){
                throw new Error('Oops, something went wrong w/ communicating with backend')
            } 
            
            const  respMessage  = await response.json()
            console.log(respMessage.message)
            
            console.log("[GemeniLocationInfo] Response Message: " + respMessage.message)
            setGeminiResponse(respMessage.message)

            /*
            console.log("[GemeniLocationInfo] Adding sending log to backend: " + [mapCoords.lat,mapCoords.long,location])
            fetch('http://localhost:8888/add', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ latitude: mapCoords.lat, longitude: mapCoords.long, location: location})
            })
            */
            //setHistoryElem([latitude,longitude,location])
            
        } catch (error){
            console.error(error)
            return 'Oops, something went wrong! with entire thing'
        }
    } 

  console.log(mapCoords)
  
  return (
    <>
      <Navbar/>
      <div id = "mapandsidebar">
        <div id = "sidebar">
          <Sidebar 
          latitude = {mapCoords.lat}
          longitude = {mapCoords.long}
          location = {location}
          geminiResponse = {geminiResponse}/>
        </div>
        <div id = "map">
          <Map
          onChange ={handleLatLongChange}/>
        </div>
        
      </div>
      
    </>
  )
}

export default App
