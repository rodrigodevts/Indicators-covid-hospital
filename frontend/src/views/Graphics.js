import React from 'react';
import classes from "./GraphicsGeral.module.css";
import CasesCovid from "../components/CasesCovidControllers/CasesCovid";
import PercentualLeitos from "../components/CasesCovidControllers/PercentualLeitos";
import PercentualLeitosTotal from "../components/CasesCovidControllers/PercentualLeitosTotal";
import NavBar from "../components/Thema";

import logoImg from '../assets/marca.png';

export default function Grapich(){
  return(
    <div>
      <div className={classes.container}>
        {/* <NavBar/> */}
          <header>
            {/* <img src={logoImg} alt="Logo Empresa"/> */}
            <h1>Indicadores Covid-19</h1>
          </header>
          <CasesCovid/>
      </div>
      <div className={classes.leitosContainer}>
          <PercentualLeitos/>
      </div>
      <div className={classes.leitosTotalContainer}>
          <PercentualLeitosTotal/>
      </div>
      {/* <div className={classes.EmptyContainer}/> */}
      <div className={classes.footerContainer}>
        <footer>
          Copyright © CPC Brasil Sistemas 2020
        </footer>
      </div>
    </div>
  )
}