import { createPage } from './mini';
import { Component } from 'react';

class Home extends Component {
  render() {
    return <div>
                <p>Home</p>
            </div>;
  }

}

export default Home;
Page(createPage(Home));