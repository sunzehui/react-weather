import React, { useContext, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useRealTimeWeather } from "@/hooks/useWeather";
import relativeTime from "dayjs/plugin/relativeTime";
import { GEOContext } from "@/App";

dayjs.extend(relativeTime);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maintainAspectRatio: false,
  tension: 0.5,
  scales: {
    yAxes: {
      ticks: {
        // y轴包含一个符号
        callback: function (value, index, values) {
          return value + "℃";
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "temp Line Chart",
    },
  },
};

export function WeatherLineChart() {
  const city = useContext(GEOContext);
  const { data: realTimeData, isLoading, error } = useRealTimeWeather(city);
  if (isLoading) return <>loading...</>;
  if (error) return <>{error.message}</>;
  const forecast = realTimeData.daily;
  const forecastIdx = 0;
  const data = {
    labels: ["Morning", "Day", "Evening", "Night"],
    datasets: [
      {
        label: "温度",
        data: [
          forecast[forecastIdx].temp.morn,
          forecast[forecastIdx].temp.day,
          forecast[forecastIdx].temp.eve,
          forecast[forecastIdx].temp.night,
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointBorderWidth: 0.2,
      },
    ],
  };
  return (
    <div className="card w-full h-full  glass">
      <div className="card-body h-[250px] w-full relative">
        <Line options={options} data={data} width={100} height={100} />
      </div>
    </div>
  );
}
