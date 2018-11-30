import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* getOwners() {
    console.log("Calling API...")
    const json = yield axios.get('http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000/GetOwnerList')
        .then(response => {
            console.log("Received the data. Forwarding JSON");
            return response.data;
        });    
  yield put({ type: "RECEIVED_DATA", allOwners: json });
}

function* getProductInfo(params) {
    console.log("Calling Product Info API...");
    // const json = {param1: params.payload.owner, param2: params.payload.product};
    const json = yield axios.post('http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000/GetProductInfo', {owner: params.payload.owner, product: params.payload.product})
        .then(response => {
            console.log("Received the data. Forwarding JSON");
            return response.data;
        });    
  yield put({ type: "RECEIVED_PRODUCT_INFO", productInfo: json });
}

function* getProductsList() {
    console.log("Calling Product List API...");
    
    let data = [];
    const json = yield axios.get('http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000/GetProductList')
        .then(response => {
            return response.data;
        });
    
    // TODO: Create an array of API Calls by looping over the productList response passing different product/owner addresses for each call.
    // let _array = [
    //     axios.post('http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000/GetProductInfo', {product: json.productList.products[1]}),
    //     axios.post('http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000/GetProductInfo', {product: json.productList.products[1]}),
        
    // ];
    let _array = [];
    json.productList.products.forEach( (o, index) => {
        if(index > 0){
            _array.push(axios.post('http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000/GetProductInfo', {product: o}));
        }
    });
    for (let c of _array) {
        let x = yield c
        data.push(x.data);
    }
    yield put({ type: "RECEIVED_PRODUCTS_LIST", productsList: data });
}

function* getAccounts() {
    console.log("Calling API...")
    const json = yield axios.get('http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000/GetAccountList')
        .then(response => {
            console.log("Received all Accounts. Forwarding JSON");
            return response.data;
        });    
  yield put({ type: "RECEIVED_ACCOUNTS", allAccounts: json });
}

function* addOwner(owner, amount) {
    console.log("Calling API...")
    const json = yield axios.post('http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000/AddOwner', {owner, amount})
        .then(response => {
            console.log("Added New Owner. Forwarding JSON");
            return response.data;
        });    
  yield put({ type: "ADDED_NEW_OWNER", data: json, });
}

function* addProduct() {
    console.log("Calling API...")
    const json = yield axios.post('http://ec2-54-180-123-66.ap-northeast-2.compute.amazonaws.com:3000/AddProduct')
        .then(response => {
            console.log("Added New Product. Forwarding JSON");
            return response.json();
        });    
  yield put({ type: "ADDED_NEW_PRODUCT", data: json });
}

function* actionWatcher() {
     yield takeLatest('FETCH_DATA', getOwners)
     yield takeLatest('ADD_OWNER', addOwner)
     yield takeLatest('ADD_PRODUCT', addProduct)
     yield takeLatest('FETCH_ACCOUNTS', getAccounts)
     yield takeLatest('FETCH_PRODUCT_INFO', getProductInfo)
     yield takeLatest('FETCH_PRODUCTS_LIST', getProductsList)
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}