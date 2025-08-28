import actionTypes from "./actionTypes"
import { getSunrise, getSunset } from 'sunrise-sunset-js';

function DateToTime(date){
        return date.getHours().toString() + ":" + (date.getMinutes() < 10 ? 
                                                        ('0' + date.getMinutes().toString()) : 
                                                        date.getMinutes().toString())
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.NEW_COORD : {
            let {lat, long, location, sunrise, sunset, info} = state

            lat = action.payload.lat
            long = action.payload.long

            location = action.payload.location

            sunrise = DateToTime(getSunrise(action.payload.lat, action.payload.long))
            sunset = DateToTime(getSunset(action.payload.lat, action.payload.long))

            info = action.payload.info

            return {
                ...state,
                lat,
                long,
                location,
                sunrise,
                sunset,
                info
            }
        }
        default:
            return state
        
    }
}
