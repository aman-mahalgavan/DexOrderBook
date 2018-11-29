import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { logger  } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const initState = {};
const sagaMiddleware = createSagaMiddleware();
// const middlewares = [thunk];
const middlewares = [sagaMiddleware, logger];
const store = createStore(
    rootReducer, 
    // initState, 
    applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;