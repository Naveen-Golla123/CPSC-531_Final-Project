import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const colorDict = [
    "rgb(224, 116, 163,0.7)",
    "rgb(69, 107, 98,0.7)",
    "rgb(80, 198, 252,0.7)",
    "rgb(255, 255, 255,0.7)",
    "rgb(25, 12, 14,0.7)"
]


function LineGraph() {
    const labels = [];
    const apiData = {
        "Chennai Super Kings": [],
        "Delhi Capitals": [],
        "Kings XI Punjab": [],
        "Kolkata Knight Riders": [],
        "Mumbai Indians": [],
        "Royal Challengers Bangalore": [],
        "Sunrisers Hyderabad": []
    }

    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Dataset 2',
                data: [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
        ],
    });

    const [options, setOptions] = useState({
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Total score by individual teams in each year ',
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    });


    const dummyOptions = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis',
            },
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const dummyData = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: 'Dataset 2',
                data: [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
        ],
    };

    useEffect(() => {
        fetch("http://127.0.0.1:3001/getline_graph_scores", {
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

    function processData(res) {
        if(labels.length > 0 ){
            return
        }
        res.forEach(element => {
            for (const key in element) {
                if (key == "year") {
                    labels.push(element[key])
                } else {
                    if (element[key])
                        apiData[key].push(element[key])
                    else
                        apiData[key].push(0)
                }
            }
        });

        let localdateSet = []
        let i = 0;
        for(const key in apiData){
            localdateSet.push({
                label: key,
                data: apiData[key],
                borderColor: colorDict[i],
                backgroundColor: colorDict[i],
                yAxisID: `y`,
            })
            i++;
        }
        dummyData["datasets"] = localdateSet;
        dummyData["labels"] = labels;
        setData(dummyData)
    }

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    )
}

export default LineGraph
