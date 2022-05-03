import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';//Register User

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Cpntent-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        //set error
        const errors = err.response.data.errors;
        console.error(errors)

        dispatch({
            type: REGISTER_FAIL
        })

    }
}