'using strict'

import * as objUtil from '../../utils/object'

describe('utils:object - test the creation of a mutable object', () =>{
    it('should create a property on an object', () => {
        let obj = { }
        
        objUtil.createMutableObject(obj, 'test', 1)

        expect(obj).toMatchObject({"test": 1})
    })

    it('should allow the property to be changed', () => {
        let obj = { }
        
        objUtil.createMutableObject(obj, 'test', 1)

        obj.test = 2

        expect(obj.test).toBe(2)
    })
})