import React from 'react'
import Link from 'next/link'
import './navigation.css'

export default class Navigation extends React.Component {
    render() {
    return (
        <div id="nav_links">
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/pages/tirepressure" as="/tirepressure">
                    <a>Tire Pressure</a>
                </Link>
            </li>
        </ul>
        </div>
        )
    }
}