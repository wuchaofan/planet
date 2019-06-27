export function createPage (PageClass) {
    const page = new PageClass()
    const wxPage = {
        onLoad (options) {
          console.log("page ---onLoad---")
          page.componentDidMount && page.componentDidMount()
        },
        onReady () {
          console.log("page ---onReady---")
          page.componentWillMount && page.componentWillMount()
        },
        onShow () {
          console.log("page ---onShow---")
          page.componentDidMount && page.componentDidMount()
        },
        onHide () {
          console.log("page ---onHide---")
          page.componentWillUnmount && page.componentWillUnmount()
        },
        onUnload: function () {
          console.log("page ---onUnload---")
          page.componentWillUnmount && page.componentWillUnmount()

        }
    }
    return wxPage
}