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

export const depositETH = (owner, product) => ({
    type: "DEPOSIT_ETH",
    payload:  {owner, product}
});

export const depositERC20 = (owner, product, amount) => ({
    type: "DEPOSIT_ERC20",
    payload:  {owner, product, amount}
});

export const withdrawERC20 = (owner, product, amount) => ({
    type: "WITHDRAW_ERC20",
    payload:  {owner, product, amount}
});

export const BuyOrder = (owner, ownerId, prTrade, prBase, price, qty, sell) => ({
    type: "BUY_ORDER",
    payload:  {owner, ownerId, prTrade, prBase, price, qty, sell}
});

export const SellOrder = (owner, ownerId, prTrade, prBase, price, qty, sell) => ({
    type: "SELL_ORDER",
    payload:  {owner, ownerId, prTrade, prBase, price, qty, sell}
});

export const fetchOrderBook = (owner, prTrade, prBase, hogaN) => ({
    type: "FETCH_ORDERBOOK",
    payload:  {owner, prTrade, prBase, hogaN}
});

export const getBalance = (owner, product, flag) => ({
    type: "GET_BALANCE",
    payload:  {owner, product, flag}
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

export const generateOwner = () => ({
    type: "GENERATE_OWNER"
});

export const getEther = (owner) => ({
    type: "GET_ETHER",
    payload: { owner }
});
