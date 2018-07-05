import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { TextRow } from './TextRow'

const data = {
  key: 'Test',
  value: 'test',
}

const initPage = overrides => {
  const mockMethods = {
    onUpdate: jest.fn(),
  }
  const wrapper = shallow(<TextRow
    data={Immutable.fromJS(data)}
    {...mockMethods}
    {...overrides}
  />)
  return { mockMethods, wrapper }
}

describe('TextRow', () => {
  it('should render as expected', () => {
    const { wrapper } = initPage()
    expect(wrapper).toMatchSnapshot()
  })
})
