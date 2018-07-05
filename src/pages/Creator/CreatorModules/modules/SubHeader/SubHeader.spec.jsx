import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { SubHeader } from './SubHeader'

const data = {
  value: 'test',
}

const initPage = overrides => {
  const mockMethods = {
    onUpdate: jest.fn(),
  }
  const wrapper = shallow(<SubHeader
    data={Immutable.fromJS(data)}
    {...mockMethods}
    {...overrides}
  />)
  return { mockMethods, wrapper }
}

describe('SubHeader', () => {
  it('should render as expected', () => {
    const { wrapper } = initPage()
    expect(wrapper).toMatchSnapshot()
  })
})
