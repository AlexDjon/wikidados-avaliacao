import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ListingUsers from './pages/ListingUsers'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={ListingUsers} />
      </Switch>
    </BrowserRouter>
  )
}