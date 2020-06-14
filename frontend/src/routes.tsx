import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} exact path="/" />
      <Route component={Register} path="/register" />
    </BrowserRouter>
  )
}

export default Routes;