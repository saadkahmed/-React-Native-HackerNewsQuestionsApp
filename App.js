import React, { Component } from 'react';
import {
View
} from 'react-native';

import Header from './src/components/Header';
import CommentList from './src/components/CommentList';

class Application extends Component {
  render() {
    return (

        <View>
          <Header headerText={'Question List'} />
          <CommentList />
        </View>

    );
  }
}

export default Application;
<Header header/>
