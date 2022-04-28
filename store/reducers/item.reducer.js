import { ADD_ITEM, REMOVE_ITEM } from "../actions/item.actions";

const initialState = {
    itemList: [],
    selected: null,
}

const ItemReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_ITEM:
            return {
            ...state,
            itemList: [...state.itemList, action.payload],
        };
        case REMOVE_ITEM:
            return {
                ...state,
                itemList: state.itemList.filter(item => item.id !== action.itemID),
            }
            default:
                return state;
    }
}

export default ItemReducer;