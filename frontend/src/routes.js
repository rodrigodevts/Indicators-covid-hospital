import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Grapich from './components/Chart';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Grapich}></Route>
      </Switch>
    </BrowserRouter>
  )
}