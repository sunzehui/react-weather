import React from "react";
import styled from "styled-components";
import { get } from "lodash-es";
import { useDailyWeather } from "@/hooks/useWeather";

export function WeatherBase(props) {
  const { data, error } = useDailyWeather(props.cityId);
  if (error) return <>{error.message}</>;
  if (!data) return <>loading...</>;

  return (
    <>
      <Basic className="py-8 flex gap-x-4 items-end">
        <Temperature className="text-5xl">{get(data, "now.temp")}℃</Temperature>
        <Status>{get(data, "now.text")}</Status>
        <i className={`qi-${get(data, "now.icon")} text-3xl`}></i>
      </Basic>
      <Content className="flex justify-start gap-x-20 py-6">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <tbody>
              <tr className="hover">
                <td>温度：</td>
                <td>{get(data, "now.temp")}℃</td>
              </tr>
              <tr className="hover">
                <td>体感温度：</td>
                <td>{get(data, "now.feelsLike")}℃</td>
              </tr>
              <tr className="hover">
                <td>风力：</td>
                <td>
                  {get(data, "now.windDir")} {get(data, "now.windScale")}级{" "}
                  {get(data, "now.windSpeed")}米/秒
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Content>
    </>
  );
}

const Basic = styled.div``;
const Temperature = styled.span``;
const Content = styled.div``;
const Status = styled.span`
  font-size: 1.875rem /* 30px */;
  line-height: 2.25rem /* 36px */;
`;
