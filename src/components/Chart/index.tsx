/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/prop-types */
// @ts-nocheck

import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'

const defaultSeries = [{
    data: [{
        x: new Date(1538778600000),
        y: [6629.81, 6650.5, 6623.04, 6633.33]
      },
      {
        x: new Date(1538780400000),
        y: [6632.01, 6643.59, 6620, 6630.11]
      },
      {
        x: new Date(1538785400000),
        y: [6632.01, 6643.59, 6620, 6630.11]
      },
    ]
  }];

  const options = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
    },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Crypto chart',
    },
    xAxis: {
        labels: {
            show: false,
            maxHeight: 500,
            style: {
                colors: [],
                fontSize: '40px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'FUCKOFF',
            },
        },
    },
    noData: {
      text: 'Loading...',
    },
    tooltip: {
        enabled: false,
    },
  };

export const ChartComponent = () => {
    
const [series, setSeries] = useState(defaultSeries);
const [screenClicked, setScreenClicked] = useState(false);

let intervalId: string | number | NodeJS.Timeout | undefined;

useEffect(() => {
  const handleClick = () => {
    setScreenClicked(!screenClicked);
    clearInterval(intervalId);
  };

  document.addEventListener('click', handleClick);

  return () => document.removeEventListener('click', handleClick);
}, [screenClicked]);

useEffect(() => {
  intervalId = setInterval(() => {
    const currentData = series[0].data;
    const lastItemData = series[0].data[series[0].data.length - 1];
    const lastItemDate = lastItemData.x;
    const lastItemValue = lastItemData.y;
    const updatedDate = new Date(lastItemDate.setSeconds(lastItemDate.getSeconds() + 10));   
    
    const biggerNumbers = [...lastItemValue].map((i) => i + 1);

    if (biggerNumbers[0] > biggerNumbers[biggerNumbers.length - 1]) {
    const temp = biggerNumbers[0];
    biggerNumbers[0] = biggerNumbers[biggerNumbers.length - 1];
    biggerNumbers[biggerNumbers.length - 1] = temp;
    }

    const smallerNumbers = lastItemValue.map((i) => i - 1);
    if (smallerNumbers[0] < smallerNumbers[smallerNumbers.length - 1]) {
        const temp = smallerNumbers[0];
        smallerNumbers[0] = smallerNumbers[smallerNumbers.length - 1];
        smallerNumbers[smallerNumbers.length - 1] = temp;
        }

    const newArray = screenClicked ? biggerNumbers : smallerNumbers;

    const updatedSeries = [{
      data: [...currentData,
        {
          x: new Date(updatedDate),
          y: newArray
        }
      ]
    }];

    setSeries(updatedSeries);
  }, 10000);

  return () => clearInterval(intervalId); // Clear the interval when the component unmounts
}, [series, screenClicked]);


    
    return (
        <div id="chart">
             <Chart options={options} series={series} type="candlestick" />
             <div>current trend is {screenClicked ? <span className="uptrend">uptrend</span> : <span className='downtrend'>downtrend</span>}</div>
        </div>
    );
};