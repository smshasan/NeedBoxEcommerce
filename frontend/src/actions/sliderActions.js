import axios from 'axios';
import {
    NEW_SLIDER_REQUEST,
    NEW_SLIDER_SUCCESS,
    NEW_SLIDER_FAIL,

    GET_SLIDER_REQUEST,
    GET_SLIDER_SUCCESS,
    GET_SLIDER_FAIL,

    CLEAR_ERRORS
    
} from '../constants/sliderConstants';

export const newSlider = (sliderData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_SLIDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`https://needboxbd.onrender.com/api/v1/admin/createSlider`, sliderData, config)

        dispatch({
            type: NEW_SLIDER_SUCCESS,
            payload: data
        })

    } catch (error) { 
        dispatch({
            type: NEW_SLIDER_FAIL,
            payload: error
        })
    }
}



export const getSlider = () => async (dispatch) => {
    try {

        dispatch({ type: GET_SLIDER_REQUEST })

        

        const { data } = await axios.get(`https://needboxbd.onrender.com/api/v1/admin/getSlider`)
        console.log('sliderAction',data)

        dispatch({
            type: GET_SLIDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_SLIDER_FAIL,
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