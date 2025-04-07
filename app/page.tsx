"use client";

import {Container, Typography} from "@mui/material";
import styled from "@emotion/styled";
import React from "react";
import WeatherPreview from "@/component/WeatherPreview";

const locations: Array<string> = ["02134", "E14,GB"];

const HomeContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10%;
`;

const PreviewContainer = styled(Container)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border-top: white 1px solid;
    padding: 5mm;
`;

export default function Home() {
    return <HomeContainer>
        <Typography variant="h1">Weather</Typography>
        <PreviewContainer>
            {locations.map(item => <WeatherPreview key={item} zip={item}></WeatherPreview>)}
        </PreviewContainer>
    </HomeContainer>;
}
