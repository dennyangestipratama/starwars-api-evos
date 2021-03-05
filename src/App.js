import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Routes } from '@Utilities/Routes'
import NotFound from '@Pages/NotFound'
import Layout from '@Layout'

export default function App() {
   return (
      <Router>
         <Switch>
            <Layout>
               {Routes.map((route, index) => (
                  <Route exact={route.exact} path={route.route} component={route.component} key={index} />
               ))}
            </Layout>
            <Route exact component={NotFound} key='404' />
         </Switch>
      </Router>
   )
}
