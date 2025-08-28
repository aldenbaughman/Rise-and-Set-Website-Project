import { useAppContext } from "../contexts/context";
import { makeNewCoord } from "../reducer/actions/newCoord";


export function latlngToCityCountry(lat, long){
    const {appState, dispatch} = useAppContext();

    useEffect(() =>{
        const getCityCountry = async () => {
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`
                console.log(url)

                //setLocation calls GemeniLocationInfo during setLocation so the inforation is presented at the same time the location changes
                const response = await fetch(url).then(res=>res.json());

                console.log((response.address.city === undefined)?
                                    (response.address.country):
                                    (response.address.city + ', ' + response.address.country))


                const location = (response.address.city === undefined)?
                                    (response.address.country):
                                    (response.address.city + ', ' + response.address.country)

                
                try {
                const response = await fetch('http://localhost:8888/chat', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },  
                    body: JSON.stringify({ location: location })
                }).then(value)
                console.log(response.ok)  
                if (!response.ok){
                    throw new Error('Oops, something went wrong w/ communicating with backend')
                } 
                
                const respMessage  = await response.json()
                console.log(respMessage.message)
                
                console.log("[GemeniLocationInfo] Response Message: " + respMessage.message)
                dispatch(makeNewCoord({
                            lat: roundCoord(e.latlng.lat),
                            long: roundCoord(e.latlng.lng),
                            location: location,
                            info: info
                        }))


                /*
                if (location != 'Waiting for input' && location != historyElem[2]){
                console.log("[GemeniLocationInfo] Adding sending log to backend: " + [mapCoords.lat,mapCoords.long,location])
                fetch('http://localhost:8888/add', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ latitude: mapCoords.lat, longitude: mapCoords.long, location: location})
                })
                
                setHistoryElem([mapCoords.lat,mapCoords.long,location])
                }
                */

            } catch (error){
                console.error(error)
                return 'Oops, something went wrong! with entire thing'
            }  
        }
        getCityCountry()
    }, [lat, long])
}

export async function GeminiLocationInfo(location){
    try {
            const response = await fetch('http://localhost:8888/chat', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },  
                body: JSON.stringify({ location: location })
            }).then(value)
            console.log(response.ok)  
            if (!response.ok){
                throw new Error('Oops, something went wrong w/ communicating with backend')
            } 
            
            const respMessage  = await response.json()
            console.log(respMessage.message)
            
            console.log("[GemeniLocationInfo] Response Message: " + respMessage.message)
            /*
            dispatch(makeNewCoord({
                        lat: roundCoord(e.latlng.lat),
                        long: roundCoord(e.latlng.lng),
                        location: location,
                        info: info
                    }))
            */

            /*
            if (location != 'Waiting for input' && location != historyElem[2]){
              console.log("[GemeniLocationInfo] Adding sending log to backend: " + [mapCoords.lat,mapCoords.long,location])
              fetch('http://localhost:8888/add', {
                  method: 'POST', 
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ latitude: mapCoords.lat, longitude: mapCoords.long, location: location})
              })
              
              setHistoryElem([mapCoords.lat,mapCoords.long,location])
            }
              */

        } catch (error){
            console.error(error)
            return 'Oops, something went wrong! with entire thing'
        }
}


    