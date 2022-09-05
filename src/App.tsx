import "./App.css";
import {WeatherLineChart} from "@/components/weather-line-chart";
import styled from "styled-components";
import React, {useContext, useState} from "react";
import {WeatherBase} from "./components/weatherBase";
import {SearchCity} from "./components/searchCity";
import {Fade} from "./components/fade";
import {useLocalStorage} from "./hooks/useLocalStorage";

function App() {
    const [city, setCity] = useLocalStorage<any>('city', {})
    const handleSelectCity = (city) => {
        setCity(city)
    }
    return (
        <Container className="w-full min-h-screen bg-base-200">
            <Main className='w-full'>
                <SearchCity onSelect={handleSelectCity}/>
                <Fade in={!!(city && city.id)}>
                    <BaseContainer className="p-10 py-6">
                        <WeatherBase cityId={city.id}/>
                    </BaseContainer>
                </Fade>

                <Fade in={!!(city && city.lat)}>
                    <ChartContainer className="p-10">
                        <WeatherLineChart lat={city.lat} lon={city.lon}/>
                    </ChartContainer>
                </Fade>

            </Main>
        </Container>
    );
}

export default App;

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 1;
`;
const ChartContainer = styled.div`
  height: 45vh;
`;
const BaseContainer = styled.div`
`;
