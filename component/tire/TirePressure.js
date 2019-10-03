'using strict'

import React from 'react'
import fetch from 'isomorphic-unfetch';
import './TirePressure.css'

export default class TirePressure extends React.Component {
    constructor() {
        super()

        this.state = {
            max_psi: null,
            max_load: null,
            loadToPsi: null,
            pressureTable: []
        }
    }

    getData(tireInfo) {
        fetch(`/api/tire/pressure?max_load=${tireInfo.max_load}&max_psi=${tireInfo.max_psi}`)
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
        let result = null

        if (this.props.tireInfo.get_data) {
            this.props.tireInfo.get_data = false
            this.getData(this.props.tireInfo)
        }

        if (this.state.loadToPsi !== null) {
            result = (
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

        return result
    }
}
