import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import EventReducer from './reducers/event.reducer';
import AuthReducer from './reducers/auth.reducer';
import ItemReducer from './reducers/item.reducer';
import UbicationReducer from './reducers/ubication.reducer';

const RootReducer = combineReducers({
    items: ItemReducer,
    ubication: UbicationReducer,
    events: EventReducer,
    auth: AuthReducer,
})

export default createStore (RootReducer, applyMiddleware(thunk));