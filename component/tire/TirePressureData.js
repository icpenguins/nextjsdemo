'using strict'

import React from 'react'
import fetch from 'isomorphic-unfetch';
import './TirePressureData.css'

export default class TirePressure extends React.Component {
    constructor() {
        super()

        this.state = {
            onData: {
                hasData: false,
                loadToPsi: null,
                pressureTable: []
            },
            onError: null
        }
    }

    clearOnData() {
        this.setState({
            onData: {
                hasData: false,
                loadToPsi: null,
                pressureTable: []
            }
        })
    }

    clearOnError() {
        this.setState({ onError: null })
    }

    getData(info) {
        fetch(`/api/tire/pressure?max_load=${info.max_load}&max_psi=${info.max_psi}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (data.status === 'err') {
                    throw Error(`The request returned an error. ${data.message}`)
                }

                this.state.loadToPsi = data.body.loadToPsi

                let pressureTable = data.body.loadToPsiList.map((item) => {
                    return (
                    <div class="tirePressureRow">
                        <div class="tirePressureCell">{item.psi}</div>
                        <div class="tirePressureCell">{item.load}</div>
                    </div>
                    )})

                this.clearOnError()

                this.setState({
                    onData: {
                        hasData: true,
                        loadToPsi: data.body.loadToPsi,
                        pressureTable: pressureTable
                    }
                })
            })
            .catch(e => {
                // Clear all state data
                this.clearOnData()

                // Send the error
                this.setState({
                    onError: <div>{e.message}</div>
                })
            })
    }

    render() {
        let result = null

        if (this.props.info.get_data) {
            this.props.info.get_data = false
            this.getData(this.props.info)
        }

        if (this.state.onData.hasData) {
            result = (
                <div id="tirePressureData">
                    <div class="tirePressureLoad">Load weight (lbs) per one PSI: {this.state.onData.loadToPsi}</div>
                    <div class="tirePressureTable">
                    <div class="tirePressureHeading">
                        <div class="tirePressureRow">
                            <div class="tirePressureHead">Tire pressure (PSI)</div>
                            <div class="tirePressureHead">Tire Load Weight (pounds)</div>
                        </div>
                    </div>
                    <div class="tirePressureBody">
                        {this.state.onData.pressureTable}
                    </div>
                    </div>
                </div>
            )
        } else if (this.state.onError !== null) {
            result = this.state.onError
        }

        return result
    }
}
