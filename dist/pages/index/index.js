import { createPage } from './mini';
import { Component } from 'react';

class Index extends Component {
  render() {
    return <div>
        <p>Index</p>
    </div>;
  }

}

export default Index;
Page(createPage(Index));