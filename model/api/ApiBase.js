import ApiError from '../../model/api/ApiErrorBase'

/**
 * A base class that holds functions for standard API actions.
 */
export default class ApiBase {
    /**
     * A method to generate a generic response object.
     * @param {*} res the HTTP response object to set return values
     * @param {*} data the data object to be added to the response
     * @param {*} err the error(s), if any, that occurred
     */
    static response(res, data, err) {
        let returnCode = 200

        let result = {
            data: {},
            errors: []
        }

        if (err === undefined || !err) {
            result.data = data
        } else {
            if (!Array.isArray(err)) {
                result.errors.push({
                    detail: err.message,
                    status: err.code,
                    title: err.title
                })

                returnCode = err.code
            } else {
                returnCode = err[err.length - 1].code

                result.errors = err.map((e) => {
                    return {
                        detail: e.message,
                        status: e.status,
                        title: e.title
                    }
                })
            }
        }

        res.status(returnCode).json(result)
    }

    /**
     * Generate a generic error with will have an HTTP status code of 400.
     * @param {String} message the error message (details)
     * @param {String} title the title of the error
     */
    static generateError(message, title) {
        return new ApiError(message, title)
    }

        /**
     * Generate a generic error.
     * @param {String} message the error message (details)
     * @param {String} title the title of the error
     * @param {Number} code the HTTP error code which is other than 400
     */
    static generateError(message, title, code) {
        return new ApiError(message, title, code)
    }
}
