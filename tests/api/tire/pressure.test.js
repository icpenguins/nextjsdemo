'using strict'

import request from '../__mocks__/request'
import response from '../__mocks__/response'

import pressure from '../../../pages/api/tire/pressure'

describe('api:tire:pressure - test the tire/pressure api', () => {
    it('should return a valid json object', async () => {
        const req = new request({
            max_load: 3860,
            max_psi: 65
        })
        const res = new response()

        await pressure(req, res)

        expect(res.statusCode).toBe(200)
        expect(res.body.body.status).toBe('ok')
    })

    it('should return an error response status', async () => {
        const req = new request()
        const res = new response()

        await pressure(req, res)

        expect(res.statusCode).toBe(400)
        expect(res.body.body.status).toBe('err')
    })
})
