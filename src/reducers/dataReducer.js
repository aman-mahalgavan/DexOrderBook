import { FETCH_DATA, RECEIVED_DATA } from '../actions/types';

const initState = {
    // data: [],
    // item: {}
}

export default function (state = initState, action) {
    switch (action.type) {
        /* REACT-WEB3 Actions */
        case "web3/RECEIVE_ACCOUNT":
            return {
                ...state,
                ethAddress: action.address
            }
        case "web3/CHANGE_ACCOUNT":
            return {
                ...state,
                ethAddress: action.address
            }
        case "web3/LOGOUT":
            return {
                ...state,
                ethAddress: null
            }
        /* END */
        case FETCH_DATA:
            return {
                ...state
                // data: action.payload
            }
        case RECEIVED_DATA:
            return {
                ...state,
                ownersList: action.allOwners.ownerList
            }
        case "RECEIVED_ACCOUNTS":
            return {
                ...state,
                accountsList: action.allAccounts.accountList
            }
        case "GET_BALANCE":        
            return {
                ...state
            }
        case "RECEIVED_BALANCE1":
            return {
                ...state,
                balanceData1: action.balance1
            }
        case "RECEIVED_BALANCE2":
            return {
                ...state,
                balanceData2: action.balance2
            }
        case "BUY_ORDER":
            return {
                ...state
            }
        case "BUY_ORDER_RECEIVED":
            return {
                ...state,
                buyOrder: action.buyOrder
            }
        case "SELL_ORDER":
            return {
                ...state
            }
        case "SELL_ORDER_RECEIVED":
            return {
                ...state,
                sellOrder: action.sellOrder
            }
        case "FETCH_ORDERBOOK":
            return {
                ...state
            }
        case "RECEIVED_ORDERBOOK":
            return {
                ...state,
                orderBook: action.orderBook
            }
        case "DEPOSIT_ERC20":
            return {
                ...state
            }
        case "DEPOSITED_ERC20":
            return {
                ...state,
                ERC20_Balance: action.deposited_ERC20
            }
        case "WITHDRAW_ERC20":
            return {
                ...state
            }
        case "WITHDRAWN_ERC20":
            return {
                ...state,
                ERC20_Balance: action.withdrawn_ERC20
            }
        case "FETCH_PRODUCT_INFO": 
            return {
                ...state
            }
        case "RECEIVED_PRODUCT_INFO": 
            return {
                ...state,
                productInfo: action.productInfo
            }
        case "DEPOSIT_ETH": 
            return {
                ...state
            }
        case "DEPOSITED_ETH": 
            return {
                ...state,
                depositedETH: action.depositedETH
            }
        case "FETCH_PRODUCTS_LIST": 
            return {
                ...state
            }
        case "RECEIVED_PRODUCTS_LIST":
            // Check if productsLists exists as it's saga is being called within generateOwner saga and this returns undefined as this action is generated multiple times in 1 go 
            if(action.productsList){
                localStorage.setItem('products', JSON.stringify(action.productsList));    
                return {
                    ...state,
                    productsList: action.productsList
                }
            }
        case "GENERATE_OWNER":
            return {
                ...state
            }
        case "GENERATED_OWNER":
            return {
                ...state,
                owner: action.owner && action.owner.account ? action.owner.account : null
            }
        case "GET_ETHER":
            return {
                ...state
            }
        case "RECEIVED_ETHER":
            return {
                ...state,
                etherBalance: action.ether
            }
        case "ADD_OWNER":
            return {
                ...state
                // data: action.data
            }
        case "FETCH_ACCOUNTS":
            return {
                ...state
            }
        case "ADDED_NEW_OWNER":
            return {
                ...state,
                data: action.data
            }
        case "ADD_PRODUCT":
            return {
                ...state
                // data: action.data
            }
        case "ADDED_NEW_PRODUCT":
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}