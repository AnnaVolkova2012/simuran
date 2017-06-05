import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'

import {Hello} from './app/hello'

import './index.scss'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" component={Hello}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
