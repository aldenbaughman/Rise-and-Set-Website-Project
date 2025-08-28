import actionTypes from "../actionTypes";

export const makeNewCoord = ({newInfo}) => {
    return {
        type: actionTypes.NEW_COORD,
        payload: {newInfo}
    }
}
