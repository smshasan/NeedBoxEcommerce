import {
    GET_PRODUCTS_BY_SLUG_REQUEST,
    GET_PRODUCTS_BY_SLUG_SUCCESS,
    GET_PRODUCTS_BY_SLUG_FAIL} from '../constants/productConstants';

//  const initState = {
//      products: []

//  }


//  export default (state = initState, action) => {
//      switch (action.type) {
//          case GET_PRODUCTS_BY_SLUG_SUCCESS:
//              state = {
//                  ...state,
//                  products: action.payload.products

                 

//              }
//              break;
            
        
//      }
//              return state;
// }
 
export const productSlugReducers =  (state = { products: [] }, action) => {
  switch (action.type) {
    
      case GET_PRODUCTS_BY_SLUG_REQUEST:
          return {
               loading: true,
                products: []
          }
           
          
      
      case GET_PRODUCTS_BY_SLUG_SUCCESS:

          return {
              loading: false,
              products: action.payload.products
              
          }
     
    case  GET_PRODUCTS_BY_SLUG_FAIL :

          return {
              loading: false,
              error: action.payload
          }
       default:
            return state;
      
  }
  
};
