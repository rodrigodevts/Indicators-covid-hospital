import React,{useState, useEffect, useCallback} from 'react';
import {Bar, Line, Pie } from 'react-chartjs-2';

import api from '../services/api';

export default function Chart(){
  const [info,setInfo] = useState([]);
  const [loading,setLoading] = useState(true);

useEffect(()=>{
  async function buscaBanco(){
    const {data} = await api.get('/indicators');
    setInfo([data]);
    setLoading(false);
  }
  buscaBanco();
},[]);

 if(loading){
   return <></>
 }
 function dataAtual(){
   return Date.now;
 }
  return(
    <div className="chart">
       <Pie
          data={{
            labels: ['Confirmados','Curados','Óbitos'],
            datasets:[{
              label: '28/06/2020',
              data: [
                Number(info.map(infos => infos.confirmed[0]['QTDCONFIRMED'])),
                Number(info.map(infos => infos.cured[0]['QTDCURED'])),
                Number(info.map(infos => infos.deaths[0]['QTDDEATHS']))
             ],
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
        
              ]
            }]
          }}
          width={100}
          height={40}
          options={{ }}
        />
   </div>
  )
};