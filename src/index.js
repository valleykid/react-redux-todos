import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { initMagic } from 'react-magic-component'
import App from './components/App'
import reducer from './reducers'

const store = createStore(reducer)

initMagic()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
