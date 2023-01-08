import {
    NEW_SLIDER_REQUEST,
    NEW_SLIDER_SUCCESS,
    NEW_SLIDER_FAIL,

    GET_SLIDER_REQUEST,
    GET_SLIDER_SUCCESS,
    GET_SLIDER_FAIL,

    CLEAR_ERRORS
    
} from '../constants/sliderConstants';



export const newSliderReducer = (state = { slider: {} }, action) => {
    switch (action.type) {

        case NEW_SLIDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_SLIDER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                slider: action.payload.slider
            }

        case NEW_SLIDER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const getSliderReducer = (state = { slider: [] }, action) => {
    switch (action.type) {

        case GET_SLIDER_REQUEST: 
            return {
                loading: true,
                slider: []
            }

        case GET_SLIDER_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                slider: action.payload.slider
            }

        case GET_SLIDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}