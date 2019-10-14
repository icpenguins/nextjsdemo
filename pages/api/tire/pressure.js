'using strict'

import { createMutableObject } from '../../../utils/object'
import ApiBase from '../../../model/api/ApiBase'
import TireInformation from '../../../model/TireInformation'

export default async (req, res) => {
    try {
        let data = { }
        let ti = new TireInformation(req.query['max_load'], req.query['max_psi'])

        ti.front_to_rear_ratio = req.query['front_to_rear_ratio'] !== undefined ? req.query['front_to_rear_ratio'] : ti.front_to_rear_ratio
        ti.vehicle_weight = req.query['vehicle_weight'] !== undefined ? req.query['vehicle_weight'] : null
        ti.tire_count = req.query['tire_count'] !== undefined ? req.query['tire_count'] : ti.tire_count

        createMutableObject(data, 'loadToPsi', ti.getLoadToPsi())

        if (req.query['vehicle_weight'] !== undefined) {
            createMutableObject(data, 'optimumTirePressure', ti.getOptimumTirePressure())
        }

        createMutableObject(data, 'loadToPsiList', ti.getLoadToPsiList())

        ApiBase.response(res, data)
    } catch (e) {
        ApiBase.response(res, null, ApiBase.generateError(e.message, 'TireInformation'))
    }
}
