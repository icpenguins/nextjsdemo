'using strict'

import TireInformation from '../../../model/TireInformation'

export default async (req, res) => {
    let returnCode = 200
    let result = {
        body: {},
        message: {},
        status: ''
    }

    try {
        let ti = new TireInformation(req.query['max_load'], req.query['max_psi'])

        result.body = {
            loadToPsi: ti.getLoadToPsi(),
            loadToPsiList: ti.getLoadToPsiList()
        }

        result.status = 'ok'
    } catch (e) {
        result.message = e.message
        result.status = 'err'
        returnCode = 400
    }

    res.status(returnCode).json(result)
}
