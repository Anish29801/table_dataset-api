import React, { useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import DataTable from "../../components/DataTable/DataTable";
import { PersonRow, RandomUser } from "../../types";
import { columns } from "./columns";
import apiClient from "../../services/apiClient";
import { GridPaginationModel } from "@mui/x-data-grid";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (): Promise<PersonRow[]> => {
  const response = await apiClient.get<{ results: RandomUser[] }>("?results=100");

  return response.data.results.map((person, index) => ({
    id: index + 1,
    name: `${person.name.first} ${person.name.last}`,
    email: person.email,
    phone: person.phone,
    office: person.location.city,
    age: person.dob.age,
    startDate: new Date(person.registered.date).toLocaleDateString(),
  }));
};

const Home = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const { data: rows, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          backgroundColor: "#f5f5f5",
          padding: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <CircularProgress size={60} thickness={5} color="primary" />
          <Typography variant="h6" sx={{ mt: 2, fontFamily: "Poppins, sans-serif" }}>
            Loading data, please wait...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        Failed to load data 😿
      </Typography>
    );
  }

  return (

    <Container sx={{ mt: 6 }}>
      <WeatherCard />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        DealAmaze Project 2 - Data Table Using Axios
      </Typography>

      {rows && (
        <Box sx={{ mb: 6 }}>
          <DataTable
            rows={rows}
            columns={columns}
            pageSize={paginationModel.pageSize}
            page={paginationModel.page}
            onPageChange={(model) => setPaginationModel(model)}
          />
        </Box>
      )}

     
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      </Box>
    </Container>
  );
};

export default Home;
