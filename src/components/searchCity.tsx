import styled from "styled-components";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {get, isEmpty} from 'lodash-es'
import {useGEOLocation} from "@/hooks/useGEOLocation";
import useSWR from "swr";
import {Fade} from "./fade";

const fetchLocation = (location) => {
    return axios.get(
        'https://geoapi.qweather.com/v2/city/lookup', {
            params: {
                location,
                key: "d19ff58080ad47c48708d0229e9c6170",
            },
        }).then(resp => resp.data)
}

export function SearchCity(props) {
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState(() => {
        const localCity = localStorage.getItem('city');
        return get(JSON.parse(localCity), 'name', '')
    });
    const {lng, lat} = useGEOLocation()
    const {data} = useSWR(() => lng && lat ? `${lng},${lat}` : `-0.136439,51.507359`, fetchLocation)

    useEffect(() => {
        const item = get(data, ['location', '0'], null);
        if (item) {
            props.onSelect(item)
            setCity(item.name)
        }
    }, [data])

    const selectCity = (item) => {
        setCityList([])
        props.onSelect(item)
        setCity(item.name)
    }
    const handleInputCity = async (value) => {
        setCity(value)
        const resp = await fetchLocation(value)
        const cityList = resp?.location;
        setCityList(cityList || [])
    }
    return (
        <header className="px-8 py-8 flex items-end ">
            <City className='relative'>
                <input onChange={(evt) => handleInputCity(evt.target.value)} value={city} type="text"
                       placeholder="Type here" className="input input-bordered input-info w-full max-w-xs"/>
                <Fade in={!isEmpty(cityList)}>
                    <ul className='flex flex-col gap-1 absolute left-0 top-14 py-1 z-50 bg-white right-0 border-gray-100 rounded-lg shadow-2xl'>
                        {cityList.map(item => (
                            <li key={item.lat} onClick={() => selectCity(item)}
                                className='hover:bg-base-200 p-2'>{item.name}</li>
                        ))}
                    </ul>
                </Fade>
            </City>
        </header>
    )
}


const City = styled.div``;