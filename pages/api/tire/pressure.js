'using strict'

import ApiBase from '../../../model/api/ApiBase'
import TireInformation from '../../../model/TireInformation'


export default async (req, res) => {
    try {
        let ti = new TireInformation(req.query['max_load'], req.query['max_psi'])

        ApiBase.response(
            res,
            {
                loadToPsi: ti.getLoadToPsi(),
                loadToPsiList: ti.getLoadToPsiList()
            }
        )

    } catch (e) {
        ApiBase.response(res, null, true, e.message)
    }
}
