import React from 'react'
import TirePressure from '../component/tire/TirePressure'
import { createMutableObject } from '../utils/object'

export default class Index extends React.Component {
    constructor() {
        super()

        this.state = this.getDefaultState()

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.tirePressureHandler = this.tirePressureHandler.bind(this)
    }

    handleChange(event) {
        let obj = {}
        
        createMutableObject(obj, event.target.name, event.target.value)
        createMutableObject(obj, 'get_data', false)

        this.setState(this.getDefaultState(obj))
    }

    handleClick(event) {
        //alert(`max_load: ${this.state.max_load}, max_psi: ${this.state.max_psi}`);

        this.setState(createMutableObject({}, 'get_data', true))
        event.preventDefault();
    }

    tirePressureHandler(dataFromChild) {
        // log our state before and after we updated it
        console.log('%cPrevious Parent State: ' + JSON.stringify(this.state), "color:orange");

        alert(`max_load: ${this.state.max_load}, max_psi: ${this.state.max_psi}`);
        this.setState({
            data: dataFromChild
        },() => console.log('Updated Parent State:', this.state));
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        Maximum Gross Tire Load (LBS)
                        <input name="max_load" type="number" value={this.state.max_load} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Maximum Cold Tire Pressure (PSI)
                        <input name="max_psi" type="number" value={this.state.max_psi} onChange={this.handleChange} />
                    </label>
                    <button onClick={this.handleClick}>Get Load</button>
                </form>
                <TirePressure info={this.state}/>
            </div>
        )
    }

    getDefaultState(setState) {
        let objState = {}

        if (setState === undefined || setState.hasOwnProperty('max_load')) {
            createMutableObject(objState, 'max_load', setState === undefined ? null : setState.max_load)
        } else {
            createMutableObject(objState, 'max_load', this.state.max_load === undefined ? null : this.state.max_load)
        }

        if (setState === undefined || setState.hasOwnProperty('max_psi')) {
            createMutableObject(objState, 'max_psi', setState === undefined ? null : setState.max_psi)
        } else {
            createMutableObject(objState, 'max_psi', this.state.max_psi === undefined ? null : this.state.max_psi)
        }

        if (!setState === undefined && setState.hasOwnProperty('vehicle_weight')) {
            createMutableObject(objState, 'vehicle_weight', setState.vehicle_weight)
        } else {
            createMutableObject(objState, 'vehicle_weight', this.state !== undefined && this.state.hasOwnProperty('vehicle_weight') ? this.state.vehicle_weight : null)
        }

        if (!setState === undefined && setState.hasOwnProperty('front_to_rear_ratio')) {
            createMutableObject(objState, 'front_to_rear_ratio', setState.front_to_rear_ratio)
        } else {
            createMutableObject(objState, 'front_to_rear_ratio', this.state !== undefined && this.state.hasOwnProperty('front_to_rear_ratio') ? this.state.front_to_rear_ratio : 60)
        }

        if (!setState === undefined && setState.hasOwnProperty('vehicle_tires')) {
            createMutableObject(objState, 'vehicle_tires', setState.vehicle_tires)
        } else {
            createMutableObject(objState, 'vehicle_tires', this.state !== undefined && this.state.hasOwnProperty('vehicle_tires') ? this.state.vehicle_tires : 4)
        }

        if (!setState === undefined && setState.hasOwnProperty('get_data')) {
            createMutableObject(objState, 'get_data', setState.get_data)
        } else {
            createMutableObject(objState, 'get_data', this.state !== undefined && this.state.hasOwnProperty('get_data') ? this.state.get_data : false)
        }

        return objState
    }
}
