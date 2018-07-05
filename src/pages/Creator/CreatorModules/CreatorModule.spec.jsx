import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { CreatorModule } from './CreatorModule'

const data = {
  data: {
    key: 'Test',
    value: 'test',
  },
  id: 1,
  type: 'TextRow',
}

const initPage = overrides => {
  const mockMethods = {
    onRemove: jest.fn(),
    onUpdate: jest.fn(),
  }
  const wrapper = shallow(<CreatorModule
    moduleData={Immutable.fromJS(data)}
    {...mockMethods}
    {...overrides}
  />)
  return { mockMethods, wrapper }
}

describe('CreatorModule', () => {
  it('should render as expected', () => {
    const { wrapper } = initPage()
    expect(wrapper).toMatchSnapshot()
  })
})
