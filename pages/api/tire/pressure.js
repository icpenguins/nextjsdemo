'using strict'

import { createMutableObject } from '../../../utils/object'
import ApiBase from '../../../model/api/ApiBase'
import TireInformation from '../../../model/TireInformation'


export default async (req, res) => {
    try {
        let ti = new TireInformation(req.query['max_load'], req.query['max_psi'])

        ti.front_to_rear_ratio = req.query['front_to_rear_ratio'] !== undefined ? req.query['front_to_rear_ratio'] : ti.front_to_rear_ratio
        ti.vehicle_weight = req.query['vehicle_weight'] !== undefined ? req.query['vehicle_weight'] : null
        ti.tire_count = req.query['tire_count'] !== undefined ? req.query['tire_count'] : ti.tire_count

        let body = { }

        createMutableObject(body, 'loadToPsi', ti.getLoadToPsi())

        if (req.query['vehicle_weight'] !== undefined) {
            createMutableObject(body, 'optimumTirePressure', ti.getOptimumTirePressure())
        }

        createMutableObject(body, 'loadToPsiList', ti.getLoadToPsiList())

        ApiBase.response(res, body)
    } catch (e) {
        ApiBase.response(res, null, true, e.message)
    }
}
