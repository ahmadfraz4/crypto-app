import React from 'react'
import {Line} from  'react-chartjs-2'
import {Chart as ChartJS,LinearScale,PointElement,LineElement,Title, Tooltip, Legend ,CategoryScale} from  'chart.js'
ChartJS.register(
    CategoryScale,LinearScale,PointElement,LineElement,Title, Tooltip, Legend 
)
function ChartComponent(arr=[], currency,days) {
    // let prices = [];
    // let date = [];
    // console.log(arr.length)
    // // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    // // console.log(arr)
    // for (let i = 0; i < arr.length; i++) {
    //     if(days === '24h'){
    //       date.push(new Date(arr[i][0]).toLocaleTimeString())
    //     }
    //     date.push(new Date(arr[i][0]).toLocaleDateString())
    //     prices.push(arr[i][1])
    // }
    console.log(arr)
   let data = {
    // labels that exist under the graph
    labels : arr.arr.map((item) =>  {return arr.days == '24h'? new Date(item[0]).toLocaleTimeString(): new Date(item[0]).toLocaleDateString()} ),
    datasets : [{   
        label : `Price in ${arr.currency}`, // label that exist above the graph
        data : arr.arr.map((item)=> item[1]), // bars or lines 
        borderColor : 'rgb(53, 162, 235)',
        backgroundColor : 'rgba(53, 162, 235, 0.5)',
    }]
   };
    return (
    <Line 
       options={{responsive: true}}
       data = {data}
    />
  )
}

export default ChartComponent