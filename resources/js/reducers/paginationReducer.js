import _ from 'lodash';

import {
    META_PAGINATION
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case META_PAGINATION:
            return { state, ...action.payload };
        default:
            return state;
    }
}
