'using strict'

import TireInformation from '../../model/TireInformation'

describe('model:TireInformation - test the TireInformation model class', () =>{

    // TireInformation Constructor
    it('should set two required values; max_load and max_psi', () => {
        let obj = new TireInformation(3860, 65)

        expect(obj.max_load).toBe(3860)
        expect(obj.max_psi).toBe(65)
        expect(obj.vehicle_weight).toBeNull()
        expect(obj.front_to_rear_ratio).toBe(0.6)
        expect(obj.tire_count).toBe(4)
    })

    it('should set three values; max_load, max_psi, and vehicle_weight', () => {
        let obj = new TireInformation(3860, 65, 9100)

        expect(obj.max_load).toBe(3860)
        expect(obj.max_psi).toBe(65)
        expect(obj.vehicle_weight).toBe(9100)
        expect(obj.front_to_rear_ratio).toBe(0.6)
        expect(obj.tire_count).toBe(4)
    })

    it('should fail with bad values', () => {
        expect(() => { new TireInformation().validateValues() }).toThrow()
        expect(() => { new TireInformation(null).validateValues() }).toThrow()
        expect(() => { new TireInformation(NaN).validateValues() }).toThrow()
        expect(() => { new TireInformation(0).validateValues() }).toThrow()

        expect(() => { new TireInformation(2).validateValues() }).toThrow()
        expect(() => { new TireInformation(2, null).validateValues() }).toThrow()
        expect(() => { new TireInformation(2, NaN).validateValues() }).toThrow()
        expect(() => { new TireInformation(2, 0).validateValues() }).toThrow()

        expect(() => { new TireInformation(3860, 65).validateValues(true) }).toThrow()
        expect(() => { new TireInformation(3860, 65, null).validateValues(true) }).toThrow()
        expect(() => { new TireInformation(3860, 65, NaN).validateValues(true) }).toThrow()
        expect(() => { new TireInformation(3860, 65, 9).validateValues(true) }).toThrow()
        expect(() => { new TireInformation(3860, 65, "").validateValues(true) }).toThrow()

        expect(() => { new TireInformation(3860, 65, 200, 2).validateValues() }).toThrow()
        expect(() => { new TireInformation(3860, 65, 200, .7, 0).validateValues() }).toThrow()
        expect(() => { new TireInformation(3860, 65, 200, .7, 1001).validateValues() }).toThrow()
    })

    // Get the correct load to PSI value
    it('should get the proper load to PSI value', () => {
        let obj = new TireInformation(3860, 65)

        expect(obj.getLoadToPsi()).toBe(59.38)
    })

    // Get the correct list of load to PSI values
    it('should get the proper load to PSI value list', () => {
        let obj = new TireInformation(3860, 10)

        const expectList = [
            { psi: 4, load: 1544 },
            { psi: 5, load: 1930 },
            { psi: 6, load: 2316 },
            { psi: 7, load: 2702 },
            { psi: 8, load: 3088 },
            { psi: 9, load: 3474 },
            { psi: 10, load: 3860 }
        ]

        expect(obj.getLoadToPsiList()).toEqual(expectList)
    })

    // Get the correct list of load to PSI values
    it('should not call the function getLoadToPsi', () => {
        let obj = new TireInformation(3860, 10)

        obj.getLoadToPsi()

        const expectList = [
            { psi: 4, load: 1544 },
            { psi: 5, load: 1930 },
            { psi: 6, load: 2316 },
            { psi: 7, load: 2702 },
            { psi: 8, load: 3088 },
            { psi: 9, load: 3474 },
            { psi: 10, load: 3860 }
        ]

        expect(obj.getLoadToPsiList()).toEqual(expectList)
    })

    // Get the optimum tire pressure
    it('should return the correct tire pressure for front and rear of a 4 tired vehicle', () => {
        let obj = new TireInformation(3860, 65, 9100)

        const actual = obj.getOptimumTirePressure()

        expect(actual.frontTirePsi).toBe(51)
        expect(actual.rearTirePsi).toBe(34)
    })

    it('should return the correct tire pressure for a mono-wheeled vehicle', () => {
        let obj = new TireInformation(3860, 65, 2800, 1, 1)

        const actual = obj.getOptimumTirePressure()

        expect(actual.frontTirePsi).toBe(52)
        expect(actual.rearTirePsi).toBe(-1)
    })

    it('should throw with a front tire PSI which is too high', () => {
        let obj = new TireInformation(3860, 65, 4000, 1, 1)

        expect(() => { obj.getOptimumTirePressure() }).toThrow()
    })

    it('should throw with a rear tire PSI which is too high', () => {
        let obj = new TireInformation(3860, 65, 9100, 0.1, 2)

        expect(() => { obj.getOptimumTirePressure() }).toThrow()
    })
})
