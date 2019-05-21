import { hot } from 'react-hot-loader/root'
import React from 'react'
// import styles from '../css/App'
// import home from './components/home';
// import { pages, nextIndex, indexFromPath } from '../utils'
import UniversalComponent from './UniversalComponent'
const styles = {};


const pages = ['home'];
const nextIndex = i => ++i % pages.length;
const indexFromPath = path => {
    path = path === '/' ? '/Foo' : path
    return pages.indexOf(path.substr(1))
}

class App extends React.Component {
    render() {
        const { index, done, loading } = this.state
        const page = pages[index]
        const loadingClass = loading ? styles.loading : ''
        // const buttonClass = `${styles[page]} ${loadingClass}`

        return (
            <div className={styles.container}>
                <h1>DNA UNIVERSAL RENDERING</h1>
                {done && <div className={styles.checkmark}>all loaded</div>}

                <UniversalComponent
                    page={() => import(`./${page}`)}
                    onBefore={this.beforeChange}
                    onAfter={this.afterChange}
                    onError={this.handleError}
                />

                <button type='button' onClick={this.changePage}>
                    {this.buttonText()}
                </button>

                <p>
                    <span>*why are you looking at this? refresh the page</span>
                    <span>and view the source in Chrome for the real goods</span>
                </p>
            </div>
        )
    }

    constructor(props) {
        super(props)

        const { history } = props
        const index = indexFromPath(history.location.pathname)

        this.state = {
            index,
            loading: false,
            done: false,
            error: false
        }
    }

    componentDidMount() {
        const { history } = this.props
        this.unregisterHistoryListener = history.listen(({ pathname }) => {
            const index = indexFromPath(pathname)
            this.setState({ index })
        })
    }

    componentWillUnmount() {
        if (this.unregisterHistoryListener) {
            this.unregisterHistoryListener()
        }
    }

    changePage = () => {
        const { loading, index } = this.state
        const { history } = this.props
        if (loading) return

        const idx = nextIndex(index)
        const page = pages[idx]

        history.push(`/${page}`)
    }

    beforeChange = ({ isSync }) => {
        if (!isSync) {
            this.setState({ loading: true, error: false })
        }
    }

    afterChange = ({ isSync, isServer, isMount }) => {
        if (!isSync) {
            this.setState({ loading: false, error: false })
        }
        else if (!isServer && !isMount) {
            this.setState({ done: true, error: false })
        }
    }

    handleError = error => {
        this.setState({ error: true, loading: false })
    }

    buttonText() {
        const { loading, error } = this.state
        if (error) return 'ERROR'
        return loading ? 'LOADING...' : 'CHANGE PAGE'
    }
}

export default hot(App)
