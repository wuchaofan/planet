import { createApp } from './mini';
import { Component } from 'react';
import { render } from 'react-dom';

class _App extends Component {
  componentWillMount() {}

  componentDidCatch() {}

  componentWillUnmount() {}

  render() {
    return <App>2</App>;
  }

}

App(createApp(_App));