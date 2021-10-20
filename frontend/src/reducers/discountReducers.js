import {
    DISCOUNT_PRODUCT_BY_CATEGORY_REQUEST,
    DISCOUNT_PRODUCT_BY_CATEGORY_SUCCESS,
    DISCOUNT_PRODUCT_BY_CATEGORY_FAIL,
    DISCOUNT_PRODUCT_BY_CATEGORY_RESET,
    CLEAR_ERRORS
} from '../constants/discountConstants';

export const discountReducer = (state = {}, action) => {
    switch (action.type) {
        case DISCOUNT_PRODUCT_BY_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case DISCOUNT_PRODUCT_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        
        case DISCOUNT_PRODUCT_BY_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload
            }
        
        case DISCOUNT_PRODUCT_BY_CATEGORY_RESET:
            return {
                ...state,
                isUpdated: false
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