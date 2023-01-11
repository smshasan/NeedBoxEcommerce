import axios from 'axios'
import {
    DELIVERY_MAN_REGISTRATION_REQUEST,
    DELIVERY_MAN_REGISTRATION_SUCCESS,
    DELIVERY_MAN_REGISTRATION_FAIL,

    DELIVERY_MAN_LOGIN_REQUEST,
    DELIVERY_MAN_LOGIN_SUCCESS,
    DELIVERY_MAN_LOGIN_FAIL,

    ALL_DELIVERYMEN_REQUEST,
    ALL_DELIVERYMEN_SUCCESS,
    ALL_DELIVERYMEN_FAIL,

    CLEAR_ERRORS
    
} from '../constants/deliveryManConstants';



/**
 * Delivery Man Registration
 * @param {*} phone 
 * @param {*} password 
 * @returns 
 */

export const login = (phone, password) => async (dispatch) => {
    try {

        dispatch({ type: DELIVERY_MAN_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('https://needboxbd.onrender.com/api/v1/login/deliveryMan', { phone, password }, config)

        dispatch({
            type: DELIVERY_MAN_LOGIN_SUCCESS,
            payload: data.deliveryMan
        })

        

    } catch (error) {
        dispatch({
            type: DELIVERY_MAN_LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}


// DeliveryMan Registration
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: DELIVERY_MAN_REGISTRATION_REQUEST })
        
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('https://needboxbd.onrender.com/api/v1/register/deliveryMan', userData, config)
        console.log('DeliveryManReg', data);
        dispatch({
            type: DELIVERY_MAN_REGISTRATION_SUCCESS,
            payload: data.deliveryMan
        })


    } catch (error) {
        dispatch({
            type: DELIVERY_MAN_REGISTRATION_FAIL
            ,
            payload: error.response.data.message
        })
    }
}

// Get all deliverymen 
export const allDeliveryMen = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_DELIVERYMEN_REQUEST})

        const { data } = await axios.get('https://needboxbd.onrender.com/api/v1/admin/deliveryMen')
        console.log('deliverymen', data);

        dispatch({
            type: ALL_DELIVERYMEN_SUCCESS,
            payload: data.deliveryMen
        })

    } catch (error) {
        dispatch({
            type: ALL_DELIVERYMEN_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
