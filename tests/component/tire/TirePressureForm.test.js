'using strict'

import { mount } from 'enzyme'
import TirePressureForm from '../../../component/tire/TirePressureForm'

describe('component:tire:pressuredform - tire pressure form', () => {

    it('should be div id=tirePressureForm', () => {
        let wrapper = shallow(<TirePressureForm />)

        expect(wrapper.find('#tirePressureForm').length).toBe(1)
    })

    it('should be set the state value for max_load', () => {
        let wrapper = mount(<TirePressureForm />)
        let propName = 'max_load'
        let propValue = 3860

        let load = wrapper.find(`input[name="${propName}"]`)
        load.simulate('change', { target: { name: propName, value: propValue } })

        expect(wrapper.state(propName)).toBe(propValue)
    })

    it('should be set the state value for max_psi', () => {
        let wrapper = mount(<TirePressureForm />)
        let propName = 'max_psi'
        let propValue = 65

        let load = wrapper.find(`input[name="${propName}"]`)
        load.simulate('change', { target: { name: propName, value: propValue } })

        expect(wrapper.state(propName)).toBe(propValue)
    })

    it('must click and must accept enter', () => {
        let wrapper = mount(<TirePressureForm />)
        const props = [
            {
                name: 'max_load',
                value: 3860
            },
            {
                name: 'max_psi',
                value: 65
            }
        ]

        const event = {
            keyCode: 13,
            preventDefault: jest.fn()
        }

        wrapper.find(`input[name="${props[0].name}"]`).simulate('change', { target: { name: props[0].name, value: props[0].value } })
        wrapper.find(`input[name="${props[1].name}"]`).simulate('change', { target: { name: props[1].name, value: props[1].value } })
        wrapper.find('button').simulate('click', event)
        wrapper.find('button').simulate('keyDown', event)

        expect(event.preventDefault.mock.calls.length).toBe(2)
    })
})
