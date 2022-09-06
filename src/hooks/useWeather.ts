import { NowResponse } from "@/types/now-response";
import axios from "axios";
import useSWR from "swr";
import { RealTimeResponse } from "@/types/realtime-response";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { get, head } from "lodash-es";
import { useGEOLocation } from "./useGEOLocation";
import { useRequest } from "ahooks";

const fetchLocation = (location) => {
  return axios
    .get("https://geoapi.qweather.com/v2/city/lookup", {
      params: {
        location,
        key: "d19ff58080ad47c48708d0229e9c6170",
      },
    })
    .then((resp) => get(resp, "data.location", []));
};
export function useSearch() {
  const [localCity] = useLocalStorage("city", null);
  const [inputContent, setInputContent] = useState(get(localCity, "name", ""));
  const [selectedCity, setSelectedCity] = useState(null);
  const { lng, lat } = useGEOLocation();

  // 第一次加载位置信息
  const shouldFetch = () => {
    // 如果搜索历史有记录，则不操作
    if (localCity !== null) {
      return null;
    }
    // 如果成功获取到用户位置则直接返回用户位置
    if (lng && lat) {
      return `${lng},${lat}`;
    }
    return `-0.136439,51.507359`;
  };

  const setActiveCity = (item) => {
    if (item) {
      setInputContent(get(item, "name", ""));
      setSelectedCity(item);
    }
  };

  const { data: localCityList = [] } = useSWR(shouldFetch, fetchLocation);
  useEffect(() => {
    const item = head(localCityList);
    setActiveCity(item);
  }, [localCityList]);

  const { data: searchList } = useRequest(() => fetchLocation(inputContent), {
    debounceWait: 300,
    refreshDeps: [inputContent],
  });

  return {
    list: searchList || [],
    selectedCity,
    inputContent,
    handleInput: (evt) => {
      setInputContent(evt.target.value);
    },
    handleItemClick: (item) => setActiveCity(item),
  };
}
export function useNowWeather() {
  const [cityList, setCityList] = useState([]);
  const [localCity] = useLocalStorage("city", null);
  const [inputContent, setInputValue] = useState(get(localCity, "name", ""));
  const { lng, lat } = useGEOLocation();
  const [shouldListShow, setShouldListShow] = useState(false);

  useEffect(() => {
    const item = get(data, ["location", "0"], null);
    if (item) {
      props.onSelect(item);
      setInputValue(get(item, "name", ""));
    }
  }, [data]);

  const selectCity = (item) => {
    if (item) {
      props.onSelect(item);
      setInputValue(item.name);
    }
  };
}

export function useDailyWeather(locationId) {
  const { data, error } = useSWR<NowResponse>(
    () => locationId,
    (location) =>
      axios
        .get(`https://devapi.qweather.com/v7/weather/now`, {
          params: {
            location,
            key: "d19ff58080ad47c48708d0229e9c6170",
          },
        })
        .then((res) => res.data)
  );

  return {
    data: data,
    isLoading: !error && !data,
    error: error,
  };
}

export function useRealTimeWeather({ lat, lon }) {
  const { data, error } = useSWR<RealTimeResponse>(
    () => (lat && lon ? { lat, lon } : null),
    (params) => {
      return axios
        .get(`https://api.openweathermap.org/data/2.5/onecall`, {
          params: {
            ...params,
            appid: "94014be88226aec7a02dbc4b61bc3485",
            lang: "zh",
            units: "metric",
          },
        })
        .then((res) => res.data);
    }
  );
  return {
    data: data,
    isLoading: !error && !data,
    error: error,
  };
}
