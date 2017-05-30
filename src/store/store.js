import React from 'react'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
// import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'

import { routerReducer, routerMiddleware } from 'react-router-redux'

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

import {questions,answers} from '../reducers';

//routerReducer主要用于改变location时触发location_change来修改state
//routerMiddleware提供了一个可以通过触发action跳转location的机会
export function configureStore(history, initialState) {
  const reducer = combineReducers({
    routing: routerReducer,
    questions,
    answers
  })

  let devTools = []
  if (typeof document !== 'undefined') {
    devTools = [ DevTools.instrument() ]
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      ...devTools
    )
  )

  return store
}
