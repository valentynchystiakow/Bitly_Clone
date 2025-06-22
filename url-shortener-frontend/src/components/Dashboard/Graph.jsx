// imports libraries(classes)
import React from "react";
import { Bar } from "react-chartjs-2";

// imports Chart classes
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

// registers chart classes, it is required
ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);


// creates Graph component 
const Graph = ({graphData}) => {
  
    // sets data for graph  
  const labels =graphData?.map((item, i) => `${item.clickDate}`);
  const userPerDaya =graphData?.map((item) => item.count);

  // sets data and options for graph
  const data = {
    labels:
    graphData.length > 0
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data:
        graphData.length > 0
            ? userPerDaya
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor:
        graphData.length > 0 ? "#3b82f6" : "rgba(54, 162, 235, 0.1)",
        borderColor: "#1D2327",
        pointBorderColor: "red",
        fill: true,
        tension: 0.4,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  // sets options for graph
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // stepSize: 1,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
      x: {
        beginAtZero: true,
        // ticks: {
        //   stepSize: 1,
        // },
        title: {
          display: true,
          text: "Date",
          font: {
            family: "Arial",
            size: 16,
            weight: "bold",
            color: "#FF0000",
          },
        },
      },
    },
  };

  // returns Bar chart with data and options
  return <Bar className=" w-full" data={data} options={options}></Bar>;
};

// exports Graph component
export default Graph;