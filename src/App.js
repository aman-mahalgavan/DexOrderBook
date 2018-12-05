import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
// import HomeContainer from './containers/homeContainer';
import RootContainer from './containers/rootContainer';
import { Web3Provider } from 'react-web3';

import store from './store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <Web3Provider> */}
          <div className="App">
            <RootContainer />
          </div>
          {/* </Web3Provider> */}
      </Provider>
    );
  }
}

export default App;
