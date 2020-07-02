import React,{useState, useEffect} from 'react';
import {Bar } from 'react-chartjs-2';

import classes from "./GraphBox.module.css";
import logoMarca from '../../assets/marca.png';
import api from '../../services/api';


export default function Chart(){
  const [infoLeitos,setInfoLeitos] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    async function buscaBanco(){
        const {data} = await api.get('/leitos');
        setInfoLeitos([data]);
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
                  labels: [infoLeitos.map(infos => infos.leitos[2]['LEITO1'])],
                  datasets:[{
                    label: 'Disponibilidade',
                    data: [
                      Number(infoLeitos.map(infos => infos.leitos[2]['PER_VAGO'])),
                    ],
                    backgroundColor:['rgba(54, 162, 235, 0.6)'],
                  },{
                    label: 'Ocupação',
                    data: [
                      Number(infoLeitos.map(infos => infos.leitos[2]['PER_OCUPADO']))
                    ],
                    backgroundColor:['rgba(255, 51, 51, 0.6)'],
                  },
                ],  
              }}
              options={{
                maintainAspectRatio: false,
                title:{
                  display:true,
                  text: 'PERCENTUAL DE LEITOS DISPONÍVEIS E OCUPADOS',
                  //fontSize:25
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
                          ctx.fillText(data+'%', bar._model.x, bar._model.y - 5);
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
                          max: 100,
                          callback: function(value, index, values) {
                            return '%'+value;
                        }
                      }
                  }],
                  
              }
            }
              }
             />           
  )
};