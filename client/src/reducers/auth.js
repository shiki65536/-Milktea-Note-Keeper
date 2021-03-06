import { REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

const iniitialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function authReducer(state = iniitialState, action) {
    const { type, payload } = action;

    switch(type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token:null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state
    }
}