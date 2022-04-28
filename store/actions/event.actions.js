import {API_URL} from '../../constants/database'
import MAP from '../../constants/Map';
import { isLoading } from 'expo-font';

export const ADD_EVENT = "ADD_EVENT";
export const SELECT_EVENT = 'SELECT_EVENT';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const GET_EVENTS = 'GET_EVENTS';
export const LOAD_EVENTS = 'LOAD_EVENTS';

  
export const addEvent = (userId,name, description, date, location) => {
  return async dispatch => {
    try {

    const response = await fetch(`${API_URL}/events.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        userId,
        name,
        description,
        date,
        location,
      ), 
    });

    const data = await response.json();
   
      
    dispatch({
      type: ADD_EVENT,
      name: data.name,
      description: data.description,
      date: data.date,
      location,
    })
  } catch(err){
    console.log(err)
    throw err;
  }
  }
}

export const selectEvent = (eventID, description) => ({
    type: SELECT_EVENT,
    eventID,
});

export const removeItem = (id) => ({
    type: REMOVE_EVENT,
    itemID: id,
});
 

 
export const getEvents=() =>{
  try{
    return async dispatch => {
      const response = await fetch(`${API_URL}/events.json`);

      const result = await response.json();
        console.log(result)

      const events = Object.keys(result).map(key =>({
        ...result[key],
        id: key,
      }))
      if (response) {
        dispatch({
          type: GET_EVENTS,
          payload: events
        });
      } else {
        console.log ('No ha sido posible realizar el fetch')
      }
    };
  }catch (error) {
    console.log(error);
  }
};
