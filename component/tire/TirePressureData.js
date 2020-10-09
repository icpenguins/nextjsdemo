'using strict'

import React from 'react'
import fetch from 'isomorphic-unfetch'
import styles from './TirePressureData.module.css'

export default class TirePressureData extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            onData: {
                hasData: false,
                loadToPsi: null,
                optimumTirePressure: null,
                pressureTable: []
            },
            onError: null
        }
    }

    buildResponseData(parsed) {
        let otpData = ''

        let otp = parsed.data.hasOwnProperty('optimumTirePressure') ? parsed.data.optimumTirePressure : null

        this.clearOnError()

        if (otp) {
            otpData = (
                <div className={styles.optimumTirePressure}>
                    <div>Optimal Front Tire Pressure <span className={styles.optimumTirePressureFront}>{otp.frontTirePsi} (PSI)</span></div>
                    <div>Optimal RearTire Pressure <span className={style.optimumTirePressureRear}>{otp.rearTirePsi} (PSI)</span></div>
                </div>
            )
        }

        let pressureTable = parsed.data.loadToPsiList.map((item) => {
            let c = 'tirePressureRow'

            if (otp !== null && (otp.frontTirePsi === item.psi || otp.rearTirePsi === item.psi)) {
                c += ' tirePressureOptimum'
            }

            return (
                <div className={c} key={item.psi}>
                    <div className={styles.tirePressureCell}>{item.psi}</div>
                    <div className={styles.tirePressureCell}>{item.load}</div>
                </div>
            )})

        this.setState({
            onData: {
                hasData: true,
                loadToPsi: parsed.data.loadToPsi,
                optimumTirePressure: otpData,
                pressureTable: pressureTable
            }
        })
    }

    buildResponseError(parsed) {
        this.clearOnData()
        let i = 0

        let err = parsed.errors.map((e, i) => {
            return (
                <div className={style.tirePressureRow} key={i}>
                    <div className={style.tirePressureCell}>{e.status}</div>
                    <div className={style.tirePressureCell}>{e.title}</div>
                    <div className={style.tirePressureCell}>{e.detail}</div>
                </div>
            )
        })

        this.setState({
            onError: <div id="tirePressureError">{err}</div>
        })
    }

    buildQuery() {
        let query = '/api/tire/pressure?'

        query += `max_load=${this.props.info.max_load}`
        query += `&max_psi=${this.props.info.max_psi}`

        if (this.props.info.vehicle_weight !== undefined && this.props.info.vehicle_weight !== "") {
            query += `&vehicle_weight=${this.props.info.vehicle_weight}`
        }

        return query
    }

    clearOnData() {
        this.setState({
            onData: {
                hasData: false,
                loadToPsi: null,
                optimumTirePressure: null,
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

            fetch(this.buildQuery())
                .then(res => {
                    return res.json()
                })
                .then(parsed => {
                    if (parsed.errors.length > 0) {
                        this.buildResponseError(parsed)
                    } else {
                        this.buildResponseData(parsed)
                    }
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
                    <div className={style.tirePressureLoad}>Load weight (lbs) per one PSI: {this.state.onData.loadToPsi}</div>
                    {this.state.onData.optimumTirePressure}
                    <div className={style.tirePressureTable}>
                    <div className={style.tirePressureHeading}>
                        <div className={style.tirePressureRow}>
                            <div className={style.tirePressureHead}>Tire pressure (PSI)</div>
                            <div className={style.tirePressureHead}>Tire Load Weight (pounds)</div>
                        </div>
                    </div>
                    <div className={style.tirePressureBody}>
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
