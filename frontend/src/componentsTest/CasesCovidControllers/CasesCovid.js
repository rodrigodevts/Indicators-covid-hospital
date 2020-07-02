import React,{useState, useEffect} from 'react';
import {Bar } from 'react-chartjs-2';

import classes from "./GraphBox.module.css";
import logoMarca from '../../assets/marca.png';

import api from '../../services/api';

export default function Chart(){
  const [info,setInfo] = useState([]);
  const [loading,setLoading] = useState(true);
  const [dataTime,setDataTime] = useState();
  
  let day = new Date().getDay();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();

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
 
  return(
            <Bar
              data={{
                  labels: [day+'/'+month+'/'+year],
                  datasets:[{
                    label: 'Confirmados',
                    data: [Number(info.map(infos => infos.confirmed[0]['QTDCONFIRMED'])),],
                    backgroundColor:['rgba(54, 162, 235, 0.6)',],
                  },
                  {
                    label: 'Curados',
                    data: [Number(info.map(infos => infos.cured[0]['QTDCURED'])),],
                    backgroundColor:['rgba(255, 206, 86, 0.6)',]
                  },
                  {
                    label: 'Óbitos',
                    data: [Number(info.map(infos => infos.deaths[0]['QTDDEATHS'])),],
                    backgroundColor:['rgba(255, 51, 51, 0.6)',]
                  }
                ],  
              }}
              options={{
                maintainAspectRatio: false,
                title:{
                  display:true,
                  text: 'NÚMEROS DE CASOS CONFIRMADOS, RECUPERADOS E ÓBITOS',
                  padding:5
                },
                
                animation: {
                    onComplete: function () {
                      
                      var chartInstance = this.chart,
                      ctx = chartInstance.ctx;
                     
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'bottom';
                      
                      this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                          var data = dataset.data[index];                            
                          ctx.fillText(data, bar._model.x, bar._model.y + 1);
                        });
                      });
                    }
                },
                legend: {
                  display: true
                },
                tooltips: {
                  enabled: true
                 },
                 scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true,
                      }
                  }],
              }
            }}
            />
  )
};