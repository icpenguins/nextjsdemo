'using strict'

import React from 'react'
import fetch from 'isomorphic-unfetch'
import './TirePressureData.css'

export default class TirePressureData extends React.Component {
    constructor(props) {
        super(props)

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

    getData() {
        if (this.props.info.get_data) {
            this.props.info.get_data = false

            fetch(`/api/tire/pressure?max_load=${this.props.info.max_load}&max_psi=${this.props.info.max_psi}`)
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
                            <div className="tirePressureRow" key={item.psi}>
                                <div className="tirePressureCell">{item.psi}</div>
                                <div className="tirePressureCell">{item.load}</div>
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
                        onError: <div id="tirePressureError">{e.message}</div>
                    })
                })
        }
    }

    render() {
        let result = null

        this.getData()

        if (this.state.onData.hasData) {
            result = (
                <div id="tirePressureData">
                    <div className="tirePressureLoad">Load weight (lbs) per one PSI: {this.state.onData.loadToPsi}</div>
                    <div className="tirePressureTable">
                    <div className="tirePressureHeading">
                        <div className="tirePressureRow">
                            <div className="tirePressureHead">Tire pressure (PSI)</div>
                            <div className="tirePressureHead">Tire Load Weight (pounds)</div>
                        </div>
                    </div>
                    <div className="tirePressureBody">
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
