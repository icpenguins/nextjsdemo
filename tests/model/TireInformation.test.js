'using strict'

import TireInformation from '../../model/TireInformation'

describe('model:TireInformation - test the TireInformation model class', () =>{

    // TireInformation Constructor
    it('should set two required values; max_load and max_psi', () => {
        let obj = new TireInformation(3860, 65)

        expect(obj.max_load).toBe(3860)
        expect(obj.max_psi).toBe(65)
        expect(obj.vehicle_weight).toBeNull()
        expect(obj.front_to_rear_ratio).toBe(60)
        expect(obj.tire_count).toBe(4)
    })

    it('should set three values; max_load, max_psi, and vehicle_weight', () => {
        let obj = new TireInformation(3860, 65, 9100)

        expect(obj.max_load).toBe(3860)
        expect(obj.max_psi).toBe(65)
        expect(obj.vehicle_weight).toBe(9100)
        expect(obj.front_to_rear_ratio).toBe(60)
        expect(obj.tire_count).toBe(4)
    })

    it('should fail with bad values', () => {
        expect(() => { new TireInformation() }).toThrow()
        expect(() => { new TireInformation(null) }).toThrow()
        expect(() => { new TireInformation(NaN) }).toThrow()
        expect(() => { new TireInformation(0) }).toThrow()

        expect(() => { new TireInformation(2) }).toThrow()
        expect(() => { new TireInformation(2, null) }).toThrow()
        expect(() => { new TireInformation(2, NaN) }).toThrow()
        expect(() => { new TireInformation(2, 0) }).toThrow()
    })

    // Get the correct load to PSI value
    it('should get the proper load to PSI value', () => {
        let obj = new TireInformation(3860, 65)

        expect(obj.getLoadToPsi()).toBe(59.38)
    })

    // Get the correct list of load to PSI values
    it('should get the proper load to PSI value list', () => {
        let obj = new TireInformation(3860, 10)

        let expectList = [
            { 4: 1544 },
            { 5: 1930 },
            { 6: 2316 },
            { 7: 2702 },
            { 8: 3088 },
            { 9: 3474 },
            { 10: 3860 }
        ]

        expect(obj.getLoadToPsiList()).toEqual(expectList)
    })

    // Get the correct list of load to PSI values
    it('should not call the function getLoadToPsi', () => {
        let obj = new TireInformation(3860, 10)

        obj.getLoadToPsi()

        let expectList = [
            { 4: 1544 },
            { 5: 1930 },
            { 6: 2316 },
            { 7: 2702 },
            { 8: 3088 },
            { 9: 3474 },
            { 10: 3860 }
        ]

        expect(obj.getLoadToPsiList()).toEqual(expectList)
    })
})
