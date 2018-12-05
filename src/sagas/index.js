import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
const awsNodeServerURL = `http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000`;
function* getOwners() {
    const json = yield axios.get(`${awsNodeServerURL}/GetOwnerList`)
        .then(response => {
            return response.data;
        });    
  yield put({ type: "RECEIVED_DATA", allOwners: json });
}

function* depositETH(params) {
    let json = {};

    // const json = yield axios.post(`${awsNodeServerURL}/depositETH', {owner, amount`)
    //     .then(response => {
    //         console.log("Received the data. Forwarding JSON");
    //         return response.data;
    //     });    
  yield put({ type: "DEPOSITED_ETH", depositedETH: json });
}

function* depositERC20(params) {
    const json = yield axios.post(`${awsNodeServerURL}/depositERC20`, {owner: params.payload.owner, token: params.payload.product, amount: params.payload.amount})
        .then(response => {
            return response.data;
        }); 
  yield put({ type: "DEPOSITED_ERC20", deposited_ERC20: json });
}

function* withdrawERC20(params) {
    const json = yield axios.post(`${awsNodeServerURL}/withdrawERC20`, {owner: params.payload.owner, token: params.payload.product, amount: params.payload.amount})
        .then(response => {
            return response.data;
        });    
  yield put({ type: "WITHDRAWN_ERC20", withdrawn_ERC20: json });
}

function* getProductInfo(params) {
    // const json = {param1: params.payload.owner, param2: params.payload.product};
    const json = yield axios.post(`${awsNodeServerURL}/GetProductInfo`, {owner: params.payload.owner, product: params.payload.product})
        .then(response => {
            return response.data;
        });    
  yield put({ type: "RECEIVED_PRODUCT_INFO", productInfo: json });
}

function* getProductsList() {
    
    let data = [];
    const json = yield axios.get(`${awsNodeServerURL}/GetProductList`)
        .then(response => {
            return response.data;
        });
    // localStorage.setItem('products', JSON.stringify(json));
    // TODO: Create an array of API Calls by looping over the productList response passing different product/owner addresses for each call.
    // let _array = [
    //     axios.post(`${awsNodeServerURL}/GetProductInfo', {product: json.productList.products[1]}`,
    //     axios.post(`${awsNodeServerURL}/GetProductInfo', {product: json.productList.products[1]}`,
        
    // ];
    // let _array = [];
    // let _products = [];
    // json.forEach( (o, index) => {
    //     if(index > 0){
    //         _array.push(axios.post(`${awsNodeServerURL}/GetProductInfo', {product: o})`;
    //     }
    // });
    // for (let c of _array) {
    //     let x = yield c
    //     data.push({productInfo: x.data, product: c});
    // }
    localStorage.setItem('products', JSON.stringify(json));
    yield put({ type: "RECEIVED_PRODUCTS_LIST", productsList: json });
}

function* getAccounts() {
    const json = yield axios.get(`${awsNodeServerURL}/GetAccountList`)
        .then(response => {
            return response.data;
        });    
  yield put({ type: "RECEIVED_ACCOUNTS", allAccounts: json });
}

function* getBalance(params) {
    const json = yield axios.post(`${awsNodeServerURL}/GetBalance`, {owner: params.payload.owner, product: params.payload.product})
        .then(response => {
            return response.data;
        });    
    if(params.payload.flag === 'token1'){
        yield put({ type: "RECEIVED_BALANCE1", balance1: json });
    }else if(params.payload.flag === 'token2'){
        yield put({ type: "RECEIVED_BALANCE2", balance2: json });
    }
}

function* fetchOrderBook(params) {
    const json = yield axios.post(`${awsNodeServerURL}/GetHoga`, {owner: params.payload.owner, prTrade: params.payload.prTrade, prBase: params.payload.prBase, hogaN: params.payload.hogaN})
        .then(response => {
            return response.data;
        }).catch(err => {
            console.log(err);
            return err;
        });
    yield put({ type: "RECEIVED_ORDERBOOK", orderBook: json });
}

function* addOwner(owner, amount) {
    const json = yield axios.post(`${awsNodeServerURL}/AddOwner`, {owner, amount})
        .then(response => {
            return response.data;
        });    
  yield put({ type: "ADDED_NEW_OWNER", data: json, });
}

function* addProduct() {
    const json = yield axios.post(`${awsNodeServerURL}/AddProduct`)
        .then(response => {
            return response.json();
        });    
  yield put({ type: "ADDED_NEW_PRODUCT", data: json });
}

function* generateOwner() {
    const json = yield axios.get(`${awsNodeServerURL}/createETHAccount`)
    .then(response => {
        return response.data;
    });
    const products = yield* getProductsList();
    yield put({ type: "RECEIVED_PRODUCTS_LIST", productsList: products });

    yield put({ type: "GENERATED_OWNER", owner: json });
}

function* getEther(params) {
    const json = yield axios.post(`${awsNodeServerURL}/buyETH`,{
        owner: params.payload.owner.account
    })
    .then(response => {
        return response.data;
    });    
    yield put({ type: "RECEIVED_ETHER", ether: json });
}



function* LimitOrder(params) {
    console.log(`SENDING TRADE/BASE --> , ${params.payload.prTrade}  /  ${params.payload.prBase}`)
    const json = yield axios.post(`${awsNodeServerURL}/LimitOrder`,{
        owner: params.payload.owner, 
        ownerId: params.payload.ownerId, 
        prTrade: params.payload.prTrade, 
        prBase: params.payload.prBase,
        sell: params.payload.sell,
        price: params.payload.price, 
        qty: params.payload.qty
    })
        .then(response => {
            return response.data;
        });    
  yield put({ type: "BUY_ORDER_RECEIVED", buyOrder: json });
}



function* actionWatcher() {
     yield takeLatest('FETCH_DATA', getOwners)
     yield takeLatest('ADD_OWNER', addOwner)
     yield takeLatest('ADD_PRODUCT', addProduct)
     yield takeLatest('FETCH_ACCOUNTS', getAccounts)
     yield takeLatest('FETCH_PRODUCT_INFO', getProductInfo)
     yield takeLatest('FETCH_PRODUCTS_LIST', getProductsList)
     yield takeLatest('DEPOSIT_ETH', depositETH)
     yield takeLatest('GET_BALANCE', getBalance)
     yield takeLatest('DEPOSIT_ERC20', depositERC20)
     yield takeLatest('WITHDRAW_ERC20', withdrawERC20)
     yield takeLatest('BUY_ORDER', LimitOrder)
     yield takeLatest('SELL_ORDER', LimitOrder)
     yield takeLatest('FETCH_ORDERBOOK', fetchOrderBook)
     yield takeLatest('GENERATE_OWNER', generateOwner)
     yield takeLatest('GET_ETHER', getEther)
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}