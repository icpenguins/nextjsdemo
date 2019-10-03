'using strict'

import TireInformation from '../../../model/TireInformation'

export default async (req, res) => {
    let result = {
        body: {},
        message: {},
        status: ''
    }

    if (req.query['max_load'] !== undefined && req.query['max_psi'] !== undefined) {
        let ti = new TireInformation(req.query['max_load'], req.query['max_psi'])

        try {
            result.body = {
                loadToPsi: ti.getLoadToPsi(),
                loadToPsiList: ti.getLoadToPsiList()
            }

            result.status = 'ok'
        } catch (e) {
            result.message = e.message
            result.status = 'err'
        }
    } else {
        result.message = 'A max_load and max_psi value must be specified.'
        result.status = 'err'
    }

    res.status(200).json(result)
}
