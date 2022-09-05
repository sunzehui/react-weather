import {NowResponse} from "@/types/now-response";
import axios from "axios";
import useSWR from "swr";
import {RealTimeResponse} from "@/types/realtime-response";

export function useDailyWeather(locationId) {
    const {data, error} = useSWR<NowResponse>(() => locationId,
        (location) => axios.get(`https://devapi.qweather.com/v7/weather/now`, {
            params: {
                location,
                key: "d19ff58080ad47c48708d0229e9c6170",
            },
        })
            .then((res) => res.data));

    return {
        data: data,
        isLoading: !error && !data,
        error: error,
    };
}

export function useRealTimeWeather(props) {

    const {data, error} = useSWR<RealTimeResponse>(() => (props),
        (params) => {
            console.log({params})
            return axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
                params: {
                    ...params,
                    'appid': '94014be88226aec7a02dbc4b61bc3485',
                    'lang': 'zh',
                    'units': 'metric'
                },
            }).then((res) => res.data)
        });
    console.log(data)
    return {
        data: data,
        isLoading: !error && !data,
        error: error,
    };
}
