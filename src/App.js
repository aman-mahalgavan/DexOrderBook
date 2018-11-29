import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import HomeContainer from './containers/homeContainer';
import RootContainer from './containers/rootContainer';

import store from './store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <RootContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
