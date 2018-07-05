import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'

import document from './utils/document'
import models from './models'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'


const store = init({
  models,
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
