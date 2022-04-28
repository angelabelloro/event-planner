import * as FileSystem from 'expo-file-system'
import MAP from '../../constants/Map'
import { insertAddress, loadAddress } from '../../db'

export const ADD_PLACE = 'ADD_PLACE'
export const LOAD_PLACES = 'LOAD_PLACES'


export const addPlace = (title, location) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${MAP.API_KEY}`)
            const data = await response.json()
            const address = data.results[0].formatted_address;

            const result = await insertAddress(
                title,
                address,
                location.lat,
                location.lng,
            )

            console.log(result)

            dispatch({
                type: ADD_PLACE,
                payload: {
                    title,
                    address: address,
                    lat: location.lat,
                    lng: location.lng,
                }
            })
        } catch(err) {
            console.log(err)
            throw err;
        }
    } 
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const result = await loadAddress()
            console.log(result)
            dispatch({
                type: LOAD_PLACES,
                places: result.rows._array,
            })
        } catch(error) {
            throw error
        }
    }
}