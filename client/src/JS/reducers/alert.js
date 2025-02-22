import { SET_ALERT, REMOVE_ALERT } from '../const/alert';

const initialState = [];

export const alertReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
};