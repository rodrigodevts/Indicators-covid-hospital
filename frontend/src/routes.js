import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Grapichs from './views/Graphics';


export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Grapichs}></Route>
      </Switch>
    </BrowserRouter>
  )
}