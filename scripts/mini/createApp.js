
export function createApp(AppClass) {
    const app = new AppClass()
    const wxObject = {
        onLaunch () {
            app.componentWillMount && app.componentWillMount()
        },
        onShow () {
            app.componentDidMount && app.componentDidMount()
        },
        onHide () {
            app.componentWillUnmount && app.componentWillUnmount()
        },
        onError () {
            app.componentDidCatch && app.componentDidCatch()
        }
    }
    return Object.assign(wxObject, app.globalData)
}