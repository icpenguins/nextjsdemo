'using strict'

import React from 'react'
import './TirePressure.css'

export default class TirePressure extends React.Component {
    constructor() {
        super()
        this.state = {
            loadToPsi: null,
            pressureTable: []
        }
    }

    componentDidMount() {
        fetch('/api/tire/pressure?max_load=3860&max_psi=65')
            .then(results => {
                return results.json()
            })
            .then(data => {
                this.state.loadToPsi = data.body.loadToPsi

                let pressureTable = data.body.loadToPsiList.map((item) => {
                    return (
                    <div class="tirePressureRow">
                        <div class="tirePressureCell">{item.psi}</div>
                        <div class="tirePressureCell">{item.load}</div>
                    </div>
                    )})

                this.setState({
                    loadToPsi: data.body.loadToPsi,
                    pressureTable: pressureTable
                })
            })
            .catch(e => {
                this.setState({
                    pressureTable: [<div>Error: {e.message}</div>]
                })
            })
    }

    render() {
        return (
        <div id="tirePressure">
            <div>{this.state.loadToPsi}</div>
            <div class="tirePressureTable">
            <div class="tirePressureHeading">
                <div class="tirePressureRow">
                    <div class="tirePressureHead">Tire pressure (PSI)</div>
                    <div class="tirePressureHead">Tire Load Weight (pounds)</div>
                </div>
            </div>
            <div class="tirePressureBody">
                {this.state.pressureTable}
            </div>
            </div>
        </div>
        )
    }
}
