import React, { Component } from 'react';
import {
View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Header from './src/components/Header';
import CommentList from './src/components/CommentList';
import reducers from './src/Reducers';

class Application extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <Header headerText={'Question List'} />
          <CommentList />
        </View>
      </Provider>
    );
  }
}

export default Application;
<Header header/>
