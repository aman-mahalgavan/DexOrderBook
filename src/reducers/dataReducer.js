import { FETCH_DATA, RECEIVED_DATA } from '../actions/types';

const initState = {
    // data: [],
    // item: {}
}

export default function (state = initState, action) {
    switch (action.type) {
        case FETCH_DATA:
            console.log('Fetching Data');
            return {
                ...state
                // data: action.payload
            }
        case RECEIVED_DATA:
            console.log('Received Data -> ', action.allOwners);
            return {
                ...state,
                ownersList: action.allOwners.ownerList
            }
        case "RECEIVED_ACCOUNTS":
            console.log('Received All Accounts -> ', action.allAccounts);
            return {
                ...state,
                accountsList: action.allAccounts.accountList
            }
        
        case "FETCH_PRODUCT_INFO": 
            console.log("Fetching Product Info -> ", action);
            return {
                ...state
            }
        case "RECEIVED_PRODUCT_INFO": 
            return {
                ...state,
                productInfo: action.productInfo
            }
        case "FETCH_PRODUCTS_LIST": 
            console.log("Fetching Product List -> ", action);
            return {
                ...state
            }
        case "RECEIVED_PRODUCTS_LIST": 
            console.log("Received Product List -> ", action);
            return {
                ...state,
                productsList: action.productsList
            }
        case "ADD_OWNER":
            console.log('Adding New Owner -> ');
            return {
                ...state
                // data: action.data
            }
        case "FETCH_ACCOUNTS":
            console.log("Fetching all Accounts");
            return {
                ...state
            }
        case "ADDED_NEW_OWNER":
            console.log('Received Data -> ', action.data);
            return {
                ...state,
                data: action.data
            }
        case "ADD_PRODUCT":
            console.log('Adding New PRODUCT -> ');
            return {
                ...state
                // data: action.data
            }
        case "ADDED_NEW_PRODUCT":
            console.log('Received Data -> ', action.data);
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}