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
     * @param { Number } front_to_rear_ratio (optional) the percentage of weight to the front of the vehicle compared to the rear.
     *                                       The default is 60% (0.6) front and 40% (0.4) rear. A mono-tire vehicle is possible.
     * @param { Number } tire_count (optional) the total count of road contact tires for the vehicle. The default is 4.
     */
    constructor(max_load, max_psi, vehicle_weight, front_to_rear_ratio = 0.6, tire_count = 4) {
        this.max_load = max_load
        this.max_psi = max_psi
        this.tire_count = tire_count
        this.front_to_rear_ratio = front_to_rear_ratio

        this.vehicle_weight = (vehicle_weight !== undefined) ?  vehicle_weight : null

        this.loadToPsi = null
        this.loadToPsiList = null
        this.validated = false
    }

    /**
     * Gets the load weight to PSI value per PSI.
     * 
     * Equation: Maximum Load / Maximum PSI = Load to PSI.
     * 
     * @returns { Number } the load to PSI value rounded to the nearest 1/100th.
     */
    getLoadToPsi() {
        // Ensure the values have been validated
        this.validateValues()

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

        // Ensure the values have been validated
        this.validateValues()

        if (this.loadToPsi === null) {
            this.getLoadToPsi()
        }

        // Start at a tire inflation of 4 PSI because beadlocks don't go down any further
        for (let i = 4; i <= this.max_psi; i++) {
            let obj = { }

            objUtil.createMutableObject(obj, 'psi', i)
            objUtil.createMutableObject(obj, 'load', Math.round10(i * this.loadToPsi, 0))

            this.loadToPsiList.push(obj)
        }

        return this.loadToPsiList
    }

    /**
     * @typedef {Object} OptimumTirePressure
     * @property {Number} frontTirePsi - the front tire pressure for each tire of the vehicle according to the front-to-rear ratio plus 10%. The value will be -1 if there was an issue.
     * @property {Number} rearTirePsi - the front tire pressure for each tire of the vehicle according to the front-to-rear ratio plus 10%. The value will be -1 if there was an issue or there is no rear ratio set.
     */

    /**
     * Get the optimum tire pressure for the vehicle. The method requires that the vehicle weight, front-to-rear ratio, and the tire count has been set.
     * The result will have a front tire pressure and rear tire pressure set.
     * 
     * @returns { OptimumTirePressure } the optimum tire pressure for the vehicle.
     */
    getOptimumTirePressure() {
        // Ensure the values have been validated
        this.validateValues(true)

        const rearRatio = 1 - this.front_to_rear_ratio
        const loadPsi = this.getLoadToPsi()
        let result = { }

        objUtil.createMutableObject(result, 'frontTirePsi', -1)
        objUtil.createMutableObject(result, 'rearTirePsi', -1)

        const frontWeight = this.vehicle_weight * this.front_to_rear_ratio
        const rearWeight = rearRatio > 0 ? this.vehicle_weight * rearRatio : 0

        result.frontTirePsi = rearRatio > 0 ?
            // Get the front weight of the vehicle. Divide the weight by the tires. Divide that by the load to PSI. Multiply by 10% for safety and round up.
            Math.round10((frontWeight / (this.tire_count / 2) / loadPsi) * 1.1, 0) :
            // Assumes no rear weight. Divide the weight by the tires. Divide that by the load to PSI. Multiply by 10% for safety and round up.
            Math.round10((frontWeight / this.tire_count / loadPsi) * 1.1, 0)

        result.rearTirePsi = rearRatio > 0 ?
        // Get the front weight of the vehicle. Divide the weight by the tires. Divide that by the load to PSI. Multiply by 10% for safety and round up.
        Math.round10((rearWeight / (this.tire_count / 2) / loadPsi) * 1.1, 0) :
        // Set the value to -1
        -1

        if (result.frontTirePsi > this.max_psi) {
            throw Error(`The front tire PSI has been set to a value larger than the maximum tire pressure. The value was '${result.frontTirePsi}'.`)
        }

        if (result.rearTirePsi > this.max_psi) {
            throw Error(`The rear tire PSI has been set to a value larger than the maximum tire pressure. The value was '${result.rearTirePsi}'.`)
        }

        return result
    }

    validateValues(needWeight) {
        if ((!this.validated && needWeight === undefined) || needWeight) {
            if (this.max_load === undefined || this.max_load === null || Number.isNaN(this.max_load) || this.max_load < 1) {
                throw Error('The maximum load must be a number greater than 1.')
            }

            if (this.max_psi === undefined || this.max_psi === "" || this.max_psi < 1 || this.max_psi === null || Number.isNaN(this.max_psi)) {
                throw Error('The maximum PSI must be a number greater than 1.')
            }

            if (needWeight && (this.vehicle_weight === undefined || this.vehicle_weight === "" || this.vehicle_weight < 10 || this.vehicle_weight === null || Number.isNaN(this.vehicle_weight))) {
                throw Error('The maximum vehicle weight must be a number greater than 10 lbs.')
            }

            if (this.front_to_rear_ratio > 1) {
                throw Error('The front to rear vehicle ratio must be 100% (1.00) or less.')
            }

            if (this.tire_count < 1 || this.tire_count > 1000) {
                throw Error('The vehicle must have more than one tire and less than a 1000.')
            }

            this.validated = true
        }
    }
}
