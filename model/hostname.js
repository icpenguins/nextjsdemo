import React from 'react'
import * as os from 'os'

export default class HostName extends React.Component {
    static async getInitialProps () {
        return { hostname: os.hostname() }
    }

    render() {
        return <div>{ this.props.hostname }</div>
    }
}
