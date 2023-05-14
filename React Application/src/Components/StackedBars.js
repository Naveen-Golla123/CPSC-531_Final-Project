import React, { useEffect, useState } from 'react';
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


export function StackedBars() {


    const labels = [];
    let fours = [];
    let sixes = [];
    let total_boundaries = [];

    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'Fours',
                data: [],
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Sixes',
                data: [],
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Total Boudaries',
                data: [],
                backgroundColor: 'rgb(53, 162, 235)',
            },
        ],
    });

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };


    const dummydata = {
        labels,
        datasets: [
            {
                label: 'Fours',
                data: [],
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Sixes',
                data: [],
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label: 'Total Boudaries',
                data: [],
                backgroundColor: 'rgb(53, 162, 235)',
            },
        ],
    };

    useEffect(() => {
        fetch("http://127.0.0.1:3001/sixes_and_fours", {
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
        console.log(res)
        if(fours.length > 1){
            return;
        }
        res.forEach(element=>{
            labels.push(element["batsman"])
            fours.push(element["Number_of_Fours"])
            sixes.push(element["Number_of_Sixes"])
            total_boundaries.push(element["Total_Boundaries"])
        })
        dummydata["datasets"][0]["data"] = fours;
        dummydata["datasets"][1]["data"] = sixes;
        dummydata["datasets"][2]["data"] = total_boundaries;
        dummydata["labels"] = labels
        console.log(fours)
        console.log(sixes)
        console.log(total_boundaries)
        console.log(labels)
        setData(dummydata)
      }

    return <Bar options={options} data={data} />;
}
