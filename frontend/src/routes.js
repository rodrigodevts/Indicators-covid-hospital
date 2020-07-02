import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Grapichs from './views/Graphics';
// import Grapichs from './components/Thema2';
// import Grapichs from './componentsTest/Thema2';


export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Grapichs}></Route>
      </Switch>
    </BrowserRouter>
  )
}