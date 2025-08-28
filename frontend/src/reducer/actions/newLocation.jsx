import actionTypes from "../actionTypes";

export const makeNewLocation = ({location}) => {
    return {
        type : actionTypes.NEW_LOCATION,
        location: {location}
    }
}
