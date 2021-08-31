import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import * as app from './app'


export const main = ({ mountNode }) => {
  const middleware = applyMiddleware(thunk)
  const store = createStore(app.update, app.init, middleware)
  const App = (
    <Provider store={store}>
      <app.container />
    </Provider>
  )

  render(App, mountNode)
}
