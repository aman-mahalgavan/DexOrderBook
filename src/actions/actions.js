import { FETCH_DATA } from './types';

/* export const fetchData = () => dispatch => {
    console.log('fetching... ');
    const data = require('../data/data.json');
    dispatch({
        type: FETCH_DATA,
        payload: data
    });
} */

export const getOwners = () => ({
    type: "FETCH_DATA"
});

export const getProductInfo = (owner, product) => ({
    type: "FETCH_PRODUCT_INFO",
    payload:  {owner, product}
});

export const getProductsList = () => ({
    type: "FETCH_PRODUCTS_LIST"
});

export const getAccounts = () => ({
    type: "FETCH_ACCOUNTS"
});

export const addOwner = () => ({
    type: "ADD_OWNER"
});

export const addProduct = () => ({
    type: "ADD_PRODUCT"
});