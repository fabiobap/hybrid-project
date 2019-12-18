import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import paginationReducer from './paginationReducer';

export default combineReducers({
    categoriesPagination: categoryReducer,
    categoriesSelect:categoryReducer,
    productsPagination: productReducer,
    meta: paginationReducer,
    form: formReducer,
    auth: authReducer,
});

