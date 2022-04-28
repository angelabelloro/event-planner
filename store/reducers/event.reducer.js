import { ADD_EVENT, GET_EVENTS, LOAD_EVENTS, REMOVE_EVENT, SELECT_EVENT } from "../actions/event.actions";
import Event from '../../models/Event'

const initialState = {
    eventList: [],
    eventsByDAte: [],
    selectedID: null,
};

const EventReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_EVENT:
            const event = new Event(
                action.name,
                action.description,
                action.date,
                action.address,)
           return {
            eventList: [...state.eventList.concat(event)],
        };
        case LOAD_EVENTS:
            return {
                ...state,
                eventList: action.eventList,
            }
        case REMOVE_EVENT:
            return {
                ...state,
            eventList: state.eventList.filter(item => item.id !== action.eventID),
        };
        case SELECT_EVENT:
            return {
                ...state,
                selectedID: action.eventID,
            };
        case GET_EVENTS:
            return { 
                ...state,
                 eventList: action.payload ,
            }        
        default:
            return state;
    }
}

export default EventReducer;