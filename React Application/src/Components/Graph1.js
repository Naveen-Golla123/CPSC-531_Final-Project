
import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Teams win in Chasing vs Defending',
    },
  },
};

export default function Graph1() {
  let labels = []
  let dataset1 =[]
  let dataset2 = []
  const [data,setData] = useState({
    labels,
    datasets: [
      {
        label: 'Defending',
        data: null,
        backgroundColor: 'rgba(3, 252, 173, 0.7)',
      },
      {
        label: 'Chasing',
        data: null,
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
    ],
  });

  
  let dummy = {
    labels,
    datasets: [
      {
        label: 'Defending',
        data: null,
        backgroundColor: 'rgba(3, 252, 173, 0.7)',
      },
      {
        label: 'Chasing',
        data: null,
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
      },
    ],
  };

  useEffect(() => {
    fetch("http://127.0.0.1:3001/getRunsVsWickets", {
    method: "GET",
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  ).then(res => { return res.json() }).then(res => {
    processData(res);
  }).catch(err => {
    alert("GetAllCategories API failed" + err)
  });
  }, []);

  function processData(res){
    if(dataset1.length > 1) {
      return;
    }
    res.forEach(element=>{
      labels.push(element["winner"])
      dataset1.push(element["runs"])
      dataset2.push(element["wickets"])
    })
    console.log(data)
    dummy["datasets"][0]["data"] = dataset1
    dummy["datasets"][1]["data"] = dataset2
    setData(dummy)
  }

  return <Bar options={options} data={data} />;
}
