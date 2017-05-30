import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import {fromJS} from "immutable"

import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { configureStore, DevTools } from '../src/store/store'
import routes from '../src/routes/routes'
import handleData from "../src/data/handleData"

const store = configureStore(browserHistory,{
	questions:handleData(window.__initial__[0]),
	answers:handleData(window.__initial__[1])
});
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
)

console.info(__DEV__);
if(__DEV__){
  render(
    <Provider store={store}>
      <DevTools/>
    </Provider>,
    document.getElementById('devtools')
  )
}


