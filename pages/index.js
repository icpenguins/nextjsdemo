import React from 'react'
import * as os from 'os'

import HostName from '../model/hostname';

export default class Index extends React.Component {
    static async getInitialProps () {
        return { hostname: os.hostname() }
    }

    render() {
        return <div>Welcome to Next.js!!<HostName {...this.props}/></div>
    }
}
