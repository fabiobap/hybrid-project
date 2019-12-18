import _ from 'lodash';

import {
    FETCH_PRODUCT,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_PAGINATION,
    CREATE_PRODUCT,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
    PRODUCT_ERROR
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_PRODUCTS_PAGINATION:
            return action.payload.reduce((newState, product) => ({ ...newState, [product.id]: product }), {});
        case FETCH_PRODUCT:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_PRODUCT:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_PRODUCT:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_PRODUCT:
            return _.omit(state, action.payload);
        case PRODUCT_ERROR:
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
}
