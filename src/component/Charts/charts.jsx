import React from 'react'
import { fetchDailyData } from '../../api/index'
import { useState,useEffect } from 'react'
import styles from './charts.module.css'
import { Line,Bar } from 'react-chartjs-2'

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  LineElement

} from 'chart.js'
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  LineElement

);

export default({countryData:{confirmed,recovered,deaths},countryState})=>{

  const [state,setState]=useState([]);

  useEffect(()=>{

  const fetchApi = async ()=>{

    setState(await fetchDailyData());

  //  console.log(state);
  
  }
  fetchApi();
},[]);

console.log(state);
const lineChart = (

  state.length ?
  
  <Line data={{
    labels:state.map(({ date }) => new Date(date).toLocaleDateString()),

    datasets:[{
      data:state.map(({confirmed})=>confirmed),
      label:"infected",
      borderColor:"#3333ff",
      fill:true
    },{
      data:state.map(({deaths})=>deaths),
      label:"deaths",
      borderColor:"red",
      backgroundColor:'rgba(255,0,0,0.5)',
      fill:true
    },
    {
      data:state.map(({recovered})=>recovered),
      label:'recovered',
      borderColor:"green",
      backgroundColor:'rgb(0,250,0,0.5)',
      fill:true
    }
  ],
   }}/> :null
);

const BarChart=(
  confirmed 
  ? (
    <Bar 
    data={{
      labels:["Infected","deaths","recovered"],
      datasets:[{
        label:'people',
        backgroundColor:[ 
          'rgb(0,0,250,0.5)',
          'rgb(250,0,0,0.5)',
          'rgb(0,250,0,0.5)',
        ],

        data:[confirmed.value,deaths.value,recovered]

      }]
    }}
    option={{
      Legend:{display:false},
      Title:{display:true, text:`current state in ${countryState}`},
    }}
    />
  ): null
);

return <>
<div className={styles.container}>
      {countryState !=="global" ? BarChart: lineChart}
</div>
</>
}

