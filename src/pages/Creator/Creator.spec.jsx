import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { Creator } from './Creator'
import { Modules } from './CreatorModules/modules'

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

  it('should render as expected when modules list is empty', () => {
    const { wrapper } = initPage({ modulesData: Immutable.List() })
    expect(wrapper).toMatchSnapshot()
  })

  it('calls getCreator on component mount', async () => {
    const { wrapper, mockMethods } = initPage()
    await wrapper.instance().componentWillMount()

    expect(mockMethods.getCreator).toHaveBeenCalled()
  })

  it('should create new Module with proper type', () => {
    const { wrapper } = initPage()
    const instance = wrapper.instance()
    instance.addModule(Modules.SUB_HEADER)

    expect(wrapper.state().modulesData.first().get('type')).toBe('SubHeader')
  })

  it('shoudl call addMoudle on button click', () => {
    const { wrapper } = initPage()
    const instance = wrapper.instance()
    instance.addModule = jest.fn()
    const firstBtn = wrapper.find('.creator__tool-btn').first()
    firstBtn.simulate('click')

    expect(instance.addModule).toHaveBeenCalled()
  })
  it('should update module data', () => {
    const { wrapper } = initPage()
    const initModule = Immutable.fromJS({
      data: { mockKey: 'mockValue' },
      id: 12345,
      type: 'mockType',
    })
    wrapper.setState({ modulesData: Immutable.List([initModule]) })
    const instance = wrapper.instance()
    instance.updateModule(initModule.set('data', Immutable.Map({ data: 'new Data' })))

    expect(wrapper.state().modulesData.getIn([0, 'data', 'data'])).toBe('new Data')
  })
})
