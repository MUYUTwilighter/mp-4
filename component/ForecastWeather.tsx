"use client";

import ForecastWeatherData from "@/type/ForecastWeatherData";
import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import styled from "@emotion/styled";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Icon = styled.img`
    width: 20mm;
    
    @media screen and (max-width: 600px) {
        width: 10mm;
    }
`;

const StyledCell = styled(TableCell)`
    color: inherit;
`;

export default function ForecastWeather({data}: { data: Array<ForecastWeatherData> | null }) {
    data = data || [];
    return <Table>
        <TableHead>
            <TableRow>
                <StyledCell>Date</StyledCell>
                <StyledCell></StyledCell>
                <StyledCell>Min</StyledCell>
                <StyledCell>Max</StyledCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((item, index) => <TableRow key={index}>
                <StyledCell>
                    <Typography>{WEEK_DAYS[new Date(item.dt).getDay()]}</Typography>
                </StyledCell>
                <StyledCell><Icon src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt="icon"/></StyledCell>
                <StyledCell>{item.tempMin}°C</StyledCell>
                <StyledCell>{item.tempMax}°C</StyledCell>
            </TableRow>)}
        </TableBody>
    </Table>
}