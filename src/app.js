import {Component} from 'react'
import {render} from 'react-dom'

class App extends Component {
    pages = [
        "pages/index/index",
        "pages/home/index"
    ]
    config = {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "WeChat",
        "navigationBarTextStyle": "black"
    }
    componentWillMount () {}
    componentDidCatch () {}
    componentWillUnmount () {}
    render () {
        return <App>2</App>
    }
}

render(<App />, document.querySelector('#app'))
