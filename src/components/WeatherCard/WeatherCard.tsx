import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const API_KEY = "d4153b342010ef4174468b6454bc0e26";

const fetchWeather = async (location: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
};

const WeatherCard: React.FC = () => {
  const [location, setLocation] = useState("Hyderabad");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["weather", location],
    queryFn: () => fetchWeather(location),
    enabled: !!location, // don’t fetch if location is empty
    refetchOnWindowFocus: false,
  });

  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: "auto",
        my: 4,
        textAlign: "center",
        boxShadow: 4,
        borderRadius: 3,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Weather App
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Enter City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => refetch()}
            sx={{ borderRadius: 2 }}
          >
            Search
          </Button>
        </Box>

        {isLoading ? (
          <CircularProgress sx={{ my: 3 }} />
        ) : isError ? (
          <Typography color="error">❌ Failed to load weather</Typography>
        ) : data ? (
          <>
            <Typography variant="h6">{data.name}</Typography>
            <Typography variant="body1">
              🌡 {data.main.temp}°C (Feels like {data.main.feels_like}°C)
            </Typography>
            <Typography variant="body1">
              🌤 {data.weather[0].description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              💨 Wind: {data.wind.speed} m/s | 💧 Humidity: {data.main.humidity}%
            </Typography>
          </>
        ) : (
          <Typography>Enter a city to see the weather</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
