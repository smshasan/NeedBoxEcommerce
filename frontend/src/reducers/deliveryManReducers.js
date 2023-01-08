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

  CLEAR_ERRORS,
} from '../constants/deliveryManConstants'

export const deliveryManReducer = (state = { deliveryMan: {} }, action) => {
  switch (action.type) {
    case DELIVERY_MAN_LOGIN_REQUEST:
    case DELIVERY_MAN_REGISTRATION_REQUEST:
      // case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      }

    case DELIVERY_MAN_LOGIN_SUCCESS:
    case DELIVERY_MAN_REGISTRATION_SUCCESS:
      // case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        deliveryMan: action.payload,
      }

    // case LOGOUT_SUCCESS:
    //     return {
    //         loading: false,
    //         isAuthenticated: false,
    //         user: null
    //     }

    // case LOAD_USER_FAIL:
    //     return {
    //         loading: false,
    //         isAuthenticated: false,
    //         user: null,
    //         error: action.payload
    //     }

    // case LOGOUT_FAIL:
    //     return {
    //         ...state,
    //         error: action.payload
    //     }

    case DELIVERY_MAN_LOGIN_FAIL:
    case DELIVERY_MAN_REGISTRATION_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const allDeliveryMenReducer = (state = { deliveryMen: [] }, action) => {
    switch (action.type) {

        case ALL_DELIVERYMEN_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ALL_DELIVERYMEN_SUCCESS:
            return {
                ...state,
                loading: false,
                deliveryMen: action.payload
            }

        case ALL_DELIVERYMEN_FAIL:
            return {
                ...state,
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

