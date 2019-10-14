'using strict'

export default class response {
    constructor() {
        this.statusCode = null
        this.body = null
    }

    status(code) {
        this.statusCode = code
        this.body = new responseText()

        return this.body
    }
}

export class responseText {
    constructor() {
        this.data
    }

    json(data) {
        this.data = data

        return JSON.stringify(data)
    }
}
