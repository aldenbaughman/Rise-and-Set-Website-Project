import Navbar from './components/navbar/navbar'

import './App.css'

import { useEffect, useReducer, useState} from 'react'
import  Sidebar  from './components/sidebar/sidebar'
import History from './components/history/history'
import  Map  from './components/map/map'
import { map } from 'leaflet'
import { initCoordInfo } from './helper'
import { reducer } from './reducer/reducer'
import AppContext from './contexts/context'

function App() {
  /* 
  const [mapCoords, setMapCoords] = useState({lat: 0.0, long: 0.0})
  const [location, setLocation] = useState('Waiting for input')
  const [geminiResponse, setGeminiResponse] = useState('Waiting for input')

  var [historyElem, setHistoryElem] = useState([])
  var [dbHistory, setDbHistory] = useState([])

  const handleLatLongChange  = (updatedLat, updatedLong) => {
    //Later look into what prevState Actually does 
    //setMapInfo((prevState) => ({...prevState, lat: updatedLat, long: updatedLong}))
    setMapCoords({lat: updatedLat, long: updatedLong})
    
    
  }
  */

  /*
  useEffect(() => {
    //const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${mapCoords.lat}&lon=${mapCoords.long}&zoom=18&addressdetails=1`
    //console.log(url)

    //setLocation calls GemeniLocationInfo during setLocation so the inforation is presented at the same time the location changes
    //fetch(url).then(res=>res.json()).then(data=>setLocation((data.address.city === undefined)?
    //                                                        (data.address.city + ', ' + data.address.country):
    //                                                        (data.address.city + ', ' + data.address.country), () => {GemeniLocationInfo()})) 
    //console.log("location in handleLatLongChange: " + location)
    latlngToCityCountry()
  }, [mapCoords.lat, mapCoords.long])

  useEffect(() => {
    GeminiLocationInfo()
    console.log("geminiResponse in hanglelatlongchange: " + geminiResponse)
  }, [location])
  */
  
  
    
  //MENTAL ILLNESS ABOVE IGNORE ALL
  
  const [appState, dispatch] = useReducer(reducer, initCoordInfo)

  const providerState = {
    appState,
    dispatch 
  }

  /*
  <Sidebar 
          latitude = {mapCoords.lat}
          longitude = {mapCoords.long}
          location = {location}
          geminiResponse = {geminiResponse}/>
  */
  //<History/>
  return (
    <>
      <AppContext value = {providerState}>
        <Navbar/>
        <div id = "mapandsidebar">
          <div id = "sidebar">
            <Sidebar />
          </div>
          <div id = "map">
            <Map/>
          </div>
        </div>
      </AppContext>
    </>
  )
}

export default App
