import React from 'react'
import * as os from 'os'

export default class Index extends React.Component {

    static getInitialProps () {
        return { hostname: os.hostname() }
    }

    render() {
        return <div>Welcome to Next.js!! { this.props.hostname }!</div>
    }
}
