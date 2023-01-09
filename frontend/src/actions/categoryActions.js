import axios from "axios";
import { categoryConstants } from "../constants/categoryConstants";
var url = 'https://needboxbd.onrender.com/'
export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get(url + `/api/v1/category/getCategory`);
    console.log(res);
    if (res.status === 200) {
      const { categoryList } = res.data;

      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async dispatch => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST})
    const res = await axios.post(url + `/api/v1/category/create`, form);
    console.log('addCategory', res)
    if (res.status === 201) {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
        payload: res.data.category
      })
    } else {
      dispatch({
        type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
        payload: res.data.error
      })
    }

    console.log("addCategoroy", res);
  };
};

// export const getAllCategory = () => {
//     return async dispatch => {

//         dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
//         const res = await axios.get(`/api/v1/category/getCategory`)
//         console.log('okk', res);
//         if(res.status === 200){

//             const { categoryList } = res.data;

//             dispatch({
//                 type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
//                 payload: { categories: categoryList }
//             });
//         }else{
//             dispatch({
//                 type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
//                 payload: { error: res.data.error }
//             });
//         }

//     }
// }

// export const addCategory = (form) => {
//     return async dispatch => {

//         try {
//             dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });

//           const config = {
//             headers: {
//                      'Content-Type': 'application/json',
//                 // ' boundary':<calculated when request is sent></calculated>
//              }
//          }
//             const res = await axios.post(`/api/v1/category/create`, form, config );
//             if (res.status === 201) {
//                 dispatch({
//                     type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
//                     payload: { category: res.data.category }
//                 });
//             } else {
//                 dispatch({
//                     type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
//                     payload: res.data.error
//                 });
//             }
//         } catch (error) {
//             console.log(error.response);
//         }

//     }
// }

// export const updateCategories = (form) => {
//     return async dispatch => {
//         dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
//         const res = await axios.post(`/api/v1/category/update`, form);
//         if (res.status === 201) {
//             dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
//             dispatch(getAllCategory());
//         } else {
//             const { error } = res.data;
//             dispatch({
//                 type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
//                 payload: { error }
//             });
//         }
//     }
// }

// export const deleteCategories = (ids) => {
//     return async dispatch => {
//         dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST });
//         const res = await axios.post(`/api/v1/category/delete`, {
//             payload: {
//                 ids
//             }
//         });
//         if (res.status === 201) {
//             dispatch(getAllCategory());
//             dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS });
//         } else {
//             const { error } = res.data;
//             dispatch({
//                 type: categoryConstants.DELETE_CATEGORIES_FAILURE,
//                 payload: { error }
//             });
//         }
//     }
// }
