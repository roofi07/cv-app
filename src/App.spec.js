import React from 'react'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'

import App from './App'
import models from './models'

const store = init({
  models,
})

describe('App Component', () => {
  describe('rendering', () => {
    it('should render as expected', () => {
      const wrapper = shallow(<Provider store={store}><App /></Provider>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
