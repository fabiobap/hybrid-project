import hybridProject from '../apis/hybridproject';
import authApi from '../apis/authApi';
import history from '../history';
import PopUp from '../components/PopUp';

import {
    AUTH_USER,
    AUTH_ERROR,
    META_PAGINATION,
    CREATE_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    FETCH_CATEGORY,
    FETCH_CATEGORIES,
    FETCH_CATEGORIES_PAGINATION,
    CATEGORY_ERROR,
    PRODUCT_ERROR,
    FETCH_PRODUCTS_PAGINATION,
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    FETCH_PRODUCT,
    EDIT_PRODUCT
} from './types';

/** Auth */
export const signin = (formValues) => async (dispatch, getState) => {
    try {
        const response = await authApi.post('/login', formValues);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        dispatch({ type: AUTH_ERROR, payload: '' });
        localStorage.setItem('token', response.data.token);
        history.goBack();
        PopUp.showMessage('success', "Logged in successfully :)");
    } catch (e) {
        dispatch({
            type: AUTH_ERROR, payload: 'Invalid credentials'
        });
    }
};
const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
}
export const signout = () => {
    localStorage.removeItem('token');
    history.push('/react/home')
    PopUp.showMessage('success', "Logged out successfully :)");
    return {
        type: AUTH_USER,
        payload: ''
    };
};
/** Categories */
export const createCategory = formValues => async (dispatch, getState) => {
    const response = await hybridProject.post('/categories', formValues, config);
    dispatch({ type: CREATE_CATEGORY, payload: response.data });
    history.push('/react/category/list');
    PopUp.showMessage('success', "Category was successfully added!");
};

export const fetchCategories = () => async dispatch => {
    const response = await hybridProject.get('/categories');
    dispatch({ type: FETCH_CATEGORIES, payload: response.data });
};
export const fetchCategoriesToPagination = page => async dispatch => {
    try {

        var pageNum = page ? page : 1;
        const response = await hybridProject.get(`/categories/paginate?page=${pageNum}`, config);
        dispatch({
            type: FETCH_CATEGORIES_PAGINATION, payload: response.data.data
        });
        dispatch({
            type: META_PAGINATION, payload: response.data.meta
        });
    } catch (e) {
        dispatch({
            type: CATEGORY_ERROR, payload: '401 - Unauthenticated! Please Signin and try again.'
        });
    }
};
export const fetchCategory = id => async dispatch => {
    const response = await hybridProject.get(`/categories/${id}`, config);
    dispatch({ type: FETCH_CATEGORY, payload: response.data });
};
export const editCategory = (id, formValues) => async dispatch => {
    const response = await hybridProject.patch(`/categories/${id}`, formValues, config);
    dispatch({ type: EDIT_CATEGORY, payload: response.data });
    history.push('/react/category/list');
    PopUp.showMessage('success', "Category was successfully modified!");
};
export const deleteCategory = id => async dispatch => {
    await hybridProject.delete(`/categories/${id}`, config);

    dispatch({ type: DELETE_CATEGORY, payload: id });
    history.push('/react/category/list');
    PopUp.showMessage('success', "Category was successfully removed!");
};
/** Products */

export const fetchProductsToPagination = page => async dispatch => {
    try {

        var pageNum = page ? page : 1;
        const response = await hybridProject.get(`/products/paginate?page=${pageNum}`, config);
        dispatch({
            type: FETCH_PRODUCTS_PAGINATION, payload: response.data.data
        });
        dispatch({
            type: META_PAGINATION, payload: response.data.meta
        });
    } catch (e) {
        dispatch({
            type: PRODUCT_ERROR, payload: '401 - Unauthenticated! Please Signin and try again.'
        });
    }
};

export const deleteProduct = id => async dispatch => {
    await hybridProject.delete(`/products/${id}`, config);

    dispatch({ type: DELETE_PRODUCT, payload: id });
    history.push('/react/product/list');
    PopUp.showMessage('success', "Product was successfully removed!");
};

export const createProduct = formValues => async (dispatch, getState) => {
    const { name, category_id, description, prodCod, image } = formValues;
    let header = {
        headers:
            { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    };
    let formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("category_id", category_id);
    formData.append("description", description);
    formData.append("prodCod", prodCod);
    const response = await hybridProject.post('/products', formData, header);
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
    history.push('/react/product/list');
    PopUp.showMessage('success', "Product was successfully added!");
};

export const fetchProduct = id => async dispatch => {
    const response = await hybridProject.get(`/products/${id}`, config);
    dispatch({ type: FETCH_PRODUCT, payload: response.data });
};

export const editProduct = (id, formValues) => async dispatch => {
    const { name, category_id, description, prodCod, image } = formValues;
    let header = {
        headers:
            { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    };
    let formData = new FormData();
    //check if it's a new image
    if (typeof image.name == 'string') {
        formData.append("image", image);
    }
    formData.append("name", name);
    formData.append("category_id", category_id);
    formData.append("description", description);
    formData.append("prodCod", prodCod);
    formData.append('_method', 'PATCH');
    const response = await hybridProject.post(`/products/${id}`, formData, header);
    dispatch({ type: EDIT_PRODUCT, payload: response.data });
    history.push('/react/product/list');
    PopUp.showMessage('success', "Product was successfully modified!");
};
