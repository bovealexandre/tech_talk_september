"use client"
import Chart from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

// async function getData() {
//     const res = await fetch('http://localhost:8000/')
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.
//     if (!res.ok) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error('Failed to fetch data')
//     }

//     return res.json()
//   }
const Today = new Date()

const dumpData = {
      date: [Today, new Date(Today.getTime() - 24*60*60*1000), new Date(Today.getTime() - 48*60*60*1000), new Date(Today.getTime() - 72*60*60*1000), new Date(Today.getTime() - 96*60*60*1000), new Date(Today.getTime() - 120*60*60*1000), new Date(Today.getTime() - 144*60*60*1000)],
      data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 200), Math.floor(Math.random() * 300), Math.floor(Math.random() * 400) , Math.floor(Math.random() * 500), Math.floor(Math.random() * 600), Math.floor(Math.random() * 700)]
    }

export default function Stats(){
  const [data, setData] = useState(dumpData)
  
  useEffect(() => {
    fetch('http://localhost:8000/datas')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
      .catch(err => console.log(err))
  }, [])
  // const data = await getData()

  // const data = {
  //     date: [Today, new Date(Today.getTime() - 24*60*60*1000), new Date(Today.getTime() - 48*60*60*1000), new Date(Today.getTime() - 72*60*60*1000), new Date(Today.getTime() - 96*60*60*1000), new Date(Today.getTime() - 120*60*60*1000), new Date(Today.getTime() - 144*60*60*1000)],
  //     data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 200), Math.floor(Math.random() * 300), Math.floor(Math.random() * 400) , Math.floor(Math.random() * 500), Math.floor(Math.random() * 600), Math.floor(Math.random() * 700)]
  //   }

  return (
      <main className="flex min-h-screen flex-row flex-wrap items-center justify-between px-24">
        <Bar
        data={{
          labels: data.date,
          datasets: [
            {
              data: data.data,
              backgroundColor: "purple",
            },
          ],
        }}
      />
      </main>
    )
}