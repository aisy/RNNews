import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebWatch extends Component {
  render() {
    return (
      <WebView
        source={{uri:this.props.url}}
      />
    );
  }
}

module.export = 'WebWatch';