/**
 * Base error class for APIs.
 */
export class ApiErrorBase extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor)
        } else {
            this.stack = (new Error(message)).stack
        }
    }
}

/**
 * An API error that supports general return values.
 *
 * @param {String} message the message to explain the error
 * @param {String} title the title of the error
 * @param {Number} number the HTTP status code of the error
 */
export default class ApiError extends ApiErrorBase {
    constructor(message, title, code = 400) {
        super(message)

        /**
         * @type {String}
         * @description the title of the error.
         */
        this.title = title

        /**
         * @type {Number}
         * @description the HTTP status code to return
         */
        this.code = code
    }
}
