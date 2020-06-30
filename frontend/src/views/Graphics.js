import React from 'react';
import classes from "./Dashboard.module.css";
import Chars from "../components/CasesCovidControllers/Chart";
import Chars2 from "../components/CasesCovidControllers/Chart2";


export default function Grapich(){
  return(
    <div>
      <div className={classes.container}>
          <header>
            <h1>Indicadores Covid-19</h1>
          </header>
          <Chars/>
      </div>
      <div className={classes.leitosContainer}>
          <Chars2/>
      </div>
      <div className={classes.EmptyContainer}/>
    </div>
  )
}