'using strict'

import { shallow } from 'enzyme'
import fetch from 'isomorphic-unfetch'
import TirePressureData from '../../../component/tire/TirePressureData'

jest.mock('isomorphic-unfetch')

describe('component:tire:pressuredata - tire pressure data error ID', () => {
    let wrapper
    beforeEach(() => {
        fetch.mockResolvedValue({
            json: () => {
                return {
                    data: { },
                    errors: [{
                        details: 'mock error',
                        status: 400,
                        title: 'Error'
                    }]
                }
            }
        })

        const mockProps = {
            get_data: true,
            max_load: 3860,
            max_psi: 65
        }

        wrapper = shallow(<TirePressureData info={mockProps} />)
    })

    it('should be div id=tirePressureError', () => {
        let a = wrapper.find('#tirePressureError')
        expect(a.length).toBe(1)
    })
})

describe('component:tire:pressuredata - tire pressure data supports more than one error', () => {
    let wrapper
    beforeEach(() => {
        fetch.mockResolvedValue({
            json: () => {
                return {
                    data: { },
                    errors: [{
                        details: 'mock error',
                        status: 400,
                        title: 'Error'
                    }, {
                        details: 'mock error 2',
                        status: 500,
                        title: 'Error2'
                    }]
                }
            }
        })

        const mockProps = {
            get_data: true,
            max_load: 3860,
            max_psi: 65
        }

        wrapper = shallow(<TirePressureData info={mockProps} />)
    })

    it('should have two error rows', () => {
        let a = wrapper.find('#tirePressureError').find('.tirePressureRow')
        expect(a.length).toBe(2)
    })
})


describe('component:tire:pressuredata - tire pressure data component result', () => {
    let wrapper
    beforeEach(() => {
        fetch.mockResolvedValue({
            json: () => {
                return {
                    data: {
                        "loadToPsi": 59.38,
                        "loadToPsiList": [
                            {
                                "psi": 4,
                                "load": 238
                              },
                              {
                                "psi": 5,
                                "load": 297
                              },
                              {
                                "psi": 6,
                                "load": 356
                              },
                              {
                                "psi": 7,
                                "load": 416
                              },
                              {
                                "psi": 8,
                                "load": 475
                              },
                              {
                                "psi": 9,
                                "load": 534
                              },
                              {
                                "psi": 10,
                                "load": 594
                              }
                        ]
                    },
                    errors: [ ]
                }
            }
        })

        const mockProps = {
            get_data: true,
            max_load: 3860,
            max_psi: 65
        }

        wrapper = shallow(<TirePressureData info={mockProps} />)
    })

    it('should be div id=tirePressureData and the table should have 7 rows', () => {
        expect(wrapper.find('#tirePressureData').length).toBe(1)
        expect(wrapper.find('.tirePressureBody').find('.tirePressureRow').length).toBe(7)
    })
})
