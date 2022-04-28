import { ADD_PLACE, LOAD_PLACES } from '../actions/ubication.actions'
import Place from '../../models/Place'

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_PLACE:
            const place = new Place(
                Date.now(),
                action.payload.title,
                action.payload.address,
                action.payload.lat,
                action.payload.lng,
            )
            return {
                ...state,
                places: state.places.concat(place),
            }
        case LOAD_PLACES:
            return {
                ...state,
                places: action.places,
            }
        default:
            return state
    } 
}