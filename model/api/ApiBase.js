'using strict'

export default class ApiBase {
    static response(res, body, err, message) {
        let returnCode = 200

        let result = {
            body: {},
            message: {},
            status: 'ok'
        }

        if (err === undefined || !err) {
            result.body = body
        } else {
            result.message = message
            result.status = 'err'
            returnCode = 400
        }

        res.status(returnCode).json(result)
    }
}