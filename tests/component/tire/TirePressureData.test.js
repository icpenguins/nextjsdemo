'using strict'

import { shallow } from 'enzyme'
//import React from 'react'
import fetch from 'isomorphic-unfetch'
import TirePressure from '../../../component/tire/TirePressureData'

jest.mock('isomorphic-unfetch')

describe('component:tire:pressuredata - tire pressure data error ID', () => {
    let wrapper
    beforeEach(() => {
        fetch.mockResolvedValue({
            json: () => {
                return {
                    message: 'mock error',
                    status: 'err'
                }
            }
        })

        const mockProps = {
            get_data: true,
            max_load: 3860,
            max_psi: 65
        }

        wrapper = shallow(<TirePressure info={mockProps} />)
    })

    it('should be div id=tirePressureError', () => {
        let a = wrapper.find('#tirePressureError')
        expect(a.length).toBe(1)
    })
})

describe('component:tire:pressuredata - tire pressure data component result', () => {
    let wrapper
    beforeEach(() => {
        fetch.mockResolvedValue({
            json: () => {
                return {
                    body: {
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
                    message: { },
                    status: 'ok'
                }
            }
        })

        const mockProps = {
            get_data: true,
            max_load: 3860,
            max_psi: 65
        }

        wrapper = shallow(<TirePressure info={mockProps} />)
    })

    it('should be div id=tirePressureData', () => {
        let a = wrapper.find('#tirePressureData')
        expect(a.length).toBe(1)
    })
})
