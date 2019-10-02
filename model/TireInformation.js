'using strict'

import * as m from '../utils/math'
import * as objUtil from '../utils/object'

/**
 * The tire information class has a set of functions which determine the best tire pressure for the vehicle.
 */
export default class TireInformation {
    /**
     * A constructor for the tire information.
     * 
     * @param { Number } max_load the listed maximum load (pounds) of the tire.
     * @param { Number } max_psi the listed maximum cold tire pressure (PSI) of the tire.
     * @param { Number } vehicle_weight (optional) the total, loaded, weight of the vehicle.
     * @param { Number } front_to_rear_ratio (optional) the percentage of weight to the front of the vehicle compared to the rear. The default is 60% front and 40% rear.
     * @param { Number } tire_count (optional) the total count of road contact tires for the vehicle. The default is 4.
     */
    constructor(max_load, max_psi, vehicle_weight, front_to_rear_ratio = 60, tire_count = 4) {
        if (max_load === undefined || max_load === null || Number.isNaN(max_load) || max_load < 1) {
            throw Error('The maximum load must be a number greater than 1.')
        }

        if (max_psi === undefined || max_psi === null || Number.isNaN(max_psi) || max_psi < 1) {
            throw Error('The maximum PSI must be a number greater than 1.')
        }

        this.max_load = max_load
        this.max_psi = max_psi
        this.tire_count = tire_count
        this.front_to_rear_ratio = front_to_rear_ratio

        this.vehicle_weight = (typeof vehicle_weight !== 'undefined') ?  vehicle_weight : null

        this.loadToPsi = null
        this.loadToPsiList = null
    }

    /**
     * Gets the load weight to PSI value per PSI.
     * 
     * Equation: Maximum Load / Maximum PSI = Load to PSI.
     * 
     * @returns { Number } the load to PSI value rounded to the nearest 1/100th.
     */
    getLoadToPsi() {
        // Find the load weight for every one pound of pressure.
        this.loadToPsi = Math.round10(this.max_load / this.max_psi, -2)

        return this.loadToPsi
    }

    /**
     * Builds a list of weight loads for a given PSI per tire.
     * 
     * @returns { Array } a list of PSI values to load weight starting at 4 PSI and ending at the tire maximum.
     */
    getLoadToPsiList() {
        this.loadToPsiList = [ ]

        if (this.loadToPsi === null) {
            this.getLoadToPsi()
        }

        // Start at a tire inflation of 4 PSI because beadlocks don't go down any further
        for (let i = 4; i <= this.max_psi; i++) {
            this.loadToPsiList.push(objUtil.createMutableObject({ }, i, Math.round10(i * this.loadToPsi, 0)))
        }

        return this.loadToPsiList
    }
}
