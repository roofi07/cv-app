import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { Creator } from './Creator'

const data = [
  {
    data: {
      key: 'Test',
      value: 'test',
    },
    id: 1,
    type: 'TextRow',
  },
]

const initPage = overrides => {
  const mockMethods = {
    getCreator: jest.fn(),
    setCreator: jest.fn(),
  }
  const wrapper = shallow(<Creator
    modulesData={Immutable.fromJS(data)}
    {...mockMethods}
    {...overrides}
  />)
  return { mockMethods, wrapper }
}

describe('Creator', () => {
  it('should render as expected', () => {
    const { wrapper } = initPage()
    expect(wrapper).toMatchSnapshot()
  })
})
