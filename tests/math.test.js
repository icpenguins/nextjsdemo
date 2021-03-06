'using strict'

import * as m from '../utils/math'

describe('utils:math - math prototypes should load', () => {
    it('ceil10: should return 7 when the ceil10 of 0 for 19 divided by 3', () => {
        expect(Math.ceil10(19 / 3, 0)).toBe(7)
    })

    it('floor10: should return 6 when getting the floor 10 of 0 for 19 divided by 3', () => {
        expect(Math.round10(19 / 3, 0)).toBe(6)
    })

    // Negative number test
    it('floor10: should return -6 when getting the floor 10 of 0 for -19 divided by -3', () => {
        expect(Math.round10(-19 / 3, -1)).toBe(-6.3)
    })

    it('round10: should return 6.3 when rounding to the -1 for 19 divided by 3', () => {
        expect(Math.round10(19 / 3, -1)).toBe(6.3)
    })

    // Null value
    it('round10: should return NaN if a null is passed', () => {
        expect(Math.round10(NaN, -1)).toBe(NaN)
    })
})
