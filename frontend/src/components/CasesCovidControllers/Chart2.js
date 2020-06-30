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
                  // labels: [(infoLeitos.map(infos => infos.leitos[0]['LEITO1'])).toString('utf8'),'ENFERMARIA'],
                  labels: [infoLeitos.map(infos => infos.leitos[0]['LEITO1']),infoLeitos.map(infos => infos.leitos[1]['LEITO1'])],
                  datasets:[{
                    label: 'Leitos Disponíveis',
                    data: [
                      Number(infoLeitos.map(infos => infos.leitos[0]['PER_VAGO'])),
                      Number(infoLeitos.map(infos => infos.leitos[1]['PER_VAGO']))
                    ],
                    backgroundColor:['rgba(54, 162, 235, 0.6)','rgba(54, 162, 235, 0.6)']
                  },
                  {
                    label: 'Leitos Ocupados',
                    data: [
                      Number(infoLeitos.map(infos => infos.leitos[0]['PER_OCUPADO'])),
                      Number(infoLeitos.map(infos => infos.leitos[1]['PER_OCUPADO']))
                    ],
                    backgroundColor:['rgba(255, 99, 132, 0.6)','rgba(255, 99, 132, 0.6)']
                  }, 
                ],  
              }}
              options={{
                maintainAspectRatio: false,
                title:{
                  display:true,
                  text: 'PERCENTUAL DE LEITOS DISPONÍVEIS E OCUPADOS',
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