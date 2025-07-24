import Navbar from './components/navbar/navbar'

import './App.css'

import { useState} from 'react'
import  Sidebar  from './components/sidebar/sidebar'
import  Map  from './components/map/map'

function App() {
  const [mapCoords, setMapCoords] = useState({lat: 0.0, long: 0.0})
  const handleLatLongChange  = (updatedLat, updatedLong) => {
    //Later look into what prevState Actually does 
    //setMapInfo((prevState) => ({...prevState, lat: updatedLat, long: updatedLong}))
    setMapCoords({lat: updatedLat, long: updatedLong})
  }
  console.log(mapCoords)
  
  return (
    <>
      <Navbar/>
      <div id = "mapandsidebar">
        <div id = "sidebar">
          <Sidebar 
          latitude = {mapCoords.lat}
          longitude = {mapCoords.long}/>
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
