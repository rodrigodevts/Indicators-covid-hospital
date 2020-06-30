import React,{useState, useEffect} from 'react';
import {Bar } from 'react-chartjs-2';

import classes from "./LineGraph.module.css";
import logoMarca from '../../assets/marca.png';

import api from '../../services/api';

export default function Chart(){
  const [info,setInfo] = useState([]);
  const [infoLeitos,setInfoLeitos] = useState([]);
  const [loading,setLoading] = useState(true);

useEffect(()=>{
  async function buscaBanco(){
    const {data} = await api.get('/indicators');
    setInfo([data]);
    async function buscaBancoLeitos(){
      const {data} = await api.get('/leitos');
      setInfoLeitos([data]);
      console.log(data)
    }
    setLoading(false);
    buscaBancoLeitos()
  }
  buscaBanco();
},[]);

 if(loading){
   return <></>
 }
  return(
    <div className={classes.graphContainer}>
            <Bar
              data={{
                  labels: ['27/05/2020'],
                  datasets:[{
                    label: 'Confirmados',
                    data: [Number(info.map(infos => infos.confirmed[0]['QTDCONFIRMED'])),],
                    backgroundColor:['rgba(54, 162, 235, 0.6)',],
                    order: []
                  },
                  {
                    label: 'Curados',
                    data: [Number(info.map(infos => infos.cured[0]['QTDCURED'])),],
                    backgroundColor:['rgba(255, 206, 86, 0.6)',]
                  },
                  {
                    label: 'Óbitos',
                    data: [Number(info.map(infos => infos.deaths[0]['QTDDEATHS'])),],
                    backgroundColor:['rgba(255, 99, 132, 0.6)',]
                  }
                ],  
              }}
              options={{
                maintainAspectRatio: false,
                title:{
                  display:true,
                  text: 'NÚMEROS DE CASOS CONFIRMADOS, RECUPERADOS E ÓBITOS',
                  fontSize:25
                },
                scales: {
                  xAxes: [{
                      gridLines: {
                          offsetGridLines: true
                      }
                  }]
              },
              }}
            />
   </div>
  )
};