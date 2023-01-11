import axios from 'axios';
import {
    DISCOUNT_PRODUCT_BY_CATEGORY_REQUEST,
    DISCOUNT_PRODUCT_BY_CATEGORY_SUCCESS,
    DISCOUNT_PRODUCT_BY_CATEGORY_FAIL,
    DISCOUNT_PRODUCT_BY_CATEGORY_RESET,
    CLEAR_ERRORS
} from '../constants/discountConstants';

export const getDiscountBySlug = (slug, productData) => async (dispatch) => {
    try {
        dispatch({ type: DISCOUNT_PRODUCT_BY_CATEGORY_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // const res = await axios.get(`/api/v1/discount/${slug}`);
        // destructuring
        const { data } = await axios.post(`https://needboxbd.onrender.com/api/v1/discount/${slug}`, productData, config);
        console.log('discount', data);

        dispatch({
            type: DISCOUNT_PRODUCT_BY_CATEGORY_SUCCESS,
            // payload: res.data
            payload: data.success
        })


    } catch (error) {
        dispatch({
            type: DISCOUNT_PRODUCT_BY_CATEGORY_FAIL,
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