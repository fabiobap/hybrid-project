import _ from 'lodash';

import {
    FETCH_CATEGORY,
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_PAGINATION,
    CREATE_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    CATEGORY_ERROR
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_CATEGORIES_PAGINATION:
            return action.payload.reduce((newState, category) => ({ ...newState, [category.id]: category }), {});
        case FETCH_CATEGORY:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_CATEGORY:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_CATEGORY:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_CATEGORY:
            return _.omit(state, action.payload);
        case CATEGORY_ERROR:
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
}
