import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
    let labels = []
    let apidata = []
    const [data, setData] = useState({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
          {
            label: 'Extra Runs in IPL since 2008',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
          },
        ],
    })
    const dummy = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
          {
            label: 'Extra Runs in IPL since 2008',
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
              'rgba(255, 99, 132, 0.4)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(255, 206, 86, 0.4)',
              'rgba(75, 192, 192, 0.4)',
              'rgba(153, 102, 255, 0.4)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    useEffect(()=>{
        
        fetch("http://127.0.0.1:3001/extraruns",  {
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
    },[]);

   function processData(res){
    if(labels.length > 1) {
        return;
    }
        res.forEach(element=>{
            labels.push(element["extras_type"])
            apidata.push(element["Extra_Runs"])
        })
        dummy["labels"] = labels
        dummy["datasets"][0]["data"] = apidata
        setData(dummy)
    }

  return (
    <div className='flex flex-col items-center justify-center p-16'>
        <div></div>
        <div className='w-1/2'>
            <Pie className='w-1/2 h-1/2' data={data} />
        </div>
    </div>
  )
}

export default PieChart





