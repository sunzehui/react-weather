import React, { useContext, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useRealTimeWeather } from "@/hooks/useWeather";
import relativeTime from "dayjs/plugin/relativeTime";
import { GEOContext } from "@/App";
import { min, max } from "lodash-es";
dayjs.extend(relativeTime);
ChartJS.register(...registerables);

export function WeatherLineChart() {
  const city = useContext(GEOContext);
  const { data: realTimeData, isLoading, error } = useRealTimeWeather(city);
  if (isLoading) return <>loading...</>;
  if (error) return <>{error.message}</>;
  const forecast = realTimeData.daily;
  const forecastIdx = 0;
  const numList = [
    forecast[forecastIdx].temp.morn,
    forecast[forecastIdx].temp.day,
    forecast[forecastIdx].temp.eve,
    forecast[forecastIdx].temp.night,
  ];
  const data = createDataSet(numList);
  const options = createOptions(numList);
  return (
    <div className="card w-full h-full  glass">
      <div className="card-body h-[250px] w-full relative">
        <Line options={options} data={data} width={100} height={100} />
      </div>
    </div>
  );
}
function createDataSet(data: number[]) {
  return {
    labels: ["Morning", "Day", "Evening", "Night"],
    datasets: [
      {
        label: "温度",
        data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointBorderWidth: 0.2,
      },
    ],
  };
}
function createOptions(data: number[]) {
  return {
    maintainAspectRatio: false,
    tension: 0.4,
    radius: 5,
    scales: {
      yAxes: {
        ticks: {
          // y轴包含一个符号
          callback: function (value, index, values) {
            return value + "℃";
          },
        },
      },
      x: {
        position: "bottom" as const,
        gridLines: {
          offsetGridLines: false,
        },
        grid: {
          drawBorder: false,
          lineWidth: 0,
          tickLength: 0,
          offset: true,
        },
      },
      y: {
        suggestedMin: Math.ceil(min(data)) - 1,
        suggestedMax: Math.ceil(max(data)),
        ticks: {
          display: false,
          beginAtZero: true,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      datalabels: {
        color: "#36A2EB",
        align: "top",
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "temp Line Chart",
      },
    },
  };
}
