'using strict'

import { createMutableObject } from '../../utils/object'
import {
    Button,
    Col,
    FormControl,
    InputGroup,
    Row
}  from 'react-bootstrap'
import React from 'react'
import TirePressureData from './TirePressureData'
import './TirePressureForm.css'

export default class TirePressureForm extends React.Component {
    constructor() {
        super()

        this.state = this.getDefaultState()

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    getDefaultState(setState) {
        let objState = {}

        if (setState === undefined || setState.hasOwnProperty('max_load')) {
            createMutableObject(objState, 'max_load', setState === undefined ? "" : setState.max_load)
        } else {
            createMutableObject(objState, 'max_load', this.state.max_load === undefined ? "" : this.state.max_load)
        }

        if (setState === undefined || setState.hasOwnProperty('max_psi')) {
            createMutableObject(objState, 'max_psi', setState === undefined ? "" : setState.max_psi)
        } else {
            createMutableObject(objState, 'max_psi', this.state.max_psi === undefined ? "" : this.state.max_psi)
        }

        if (setState !== undefined && setState.hasOwnProperty('vehicle_weight')) {
            createMutableObject(objState, 'vehicle_weight', setState.vehicle_weight)
        } else {
            createMutableObject(objState, 'vehicle_weight', this.state !== undefined && this.state.hasOwnProperty('vehicle_weight') ? this.state.vehicle_weight : null)
        }

        if (setState !== undefined && setState.hasOwnProperty('front_to_rear_ratio')) {
            createMutableObject(objState, 'front_to_rear_ratio', setState.front_to_rear_ratio)
        } else {
            createMutableObject(objState, 'front_to_rear_ratio', this.state !== undefined && this.state.hasOwnProperty('front_to_rear_ratio') ? this.state.front_to_rear_ratio : 60)
        }

        if (setState !== undefined && setState.hasOwnProperty('vehicle_tires')) {
            createMutableObject(objState, 'vehicle_tires', setState.vehicle_tires)
        } else {
            createMutableObject(objState, 'vehicle_tires', this.state !== undefined && this.state.hasOwnProperty('vehicle_tires') ? this.state.vehicle_tires : 4)
        }

        if (setState !== undefined && setState.hasOwnProperty('get_data')) {
            createMutableObject(objState, 'get_data', setState.get_data)
        } else {
            createMutableObject(objState, 'get_data', this.state !== undefined && this.state.hasOwnProperty('get_data') ? this.state.get_data : false)
        }

        return objState
    }

    handleChange(event) {
        let obj = {}

        createMutableObject(obj, event.target.name, event.target.value)
        createMutableObject(obj, 'get_data', false)

        this.setState(this.getDefaultState(obj))
    }

    handleClick(event) {
        this.getData(event)
    }

    handleKeyDown(event) {
        if (event.keyCode === 13) {
            this.getData(event)
        }
    }

    getData(event) {
        this.setState(createMutableObject({}, 'get_data', true) )
        event.preventDefault();
    }

    render() {
        return (
            <div id="tirePressureForm">
                <Row className="no-gutters">
                    <Col md>
                        <InputGroup id="max_load" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Max Load, Single</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="max_load"
                                as="input"
                                type="number"
                                placeholder="Max Load (lbs)"
                                aria-label="Max Load (lbs)"
                                aria-describedby="max_load"
                                defaultValue={this.state.max_load}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                    </Col>
                    <Col md>
                        <InputGroup id="max_psi" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Max PSI, Cold</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="max_psi"
                                as="input"
                                type="number"
                                placeholder="Max PSI, Cold"
                                aria-label="Max PSI, Cold"
                                aria-describedby="max_psi"
                                defaultValue={this.state.max_psi}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                    </Col>
                    <Col sm>
                        <Button variant="primary" onKeyDown={this.handleKeyDown} onClick={this.handleClick}>Get Load</Button>
                    </Col>
                </Row>
                <TirePressureData info={this.state}/>
            </div>
        )
    }
}
