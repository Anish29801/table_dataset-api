import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import DataTable from "../../components/DataTable/DataTable";
import { PersonRow } from "../../types";
import { columns } from "./columns";
import apiClient from "../../services/apiClient";

const Home = () => {
  const [rows, setRows] = useState<PersonRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<{ results: any[] }>("?results=20");

        const fetchedRows: PersonRow[] = response.data.results.map((person, index) => ({
          id: index + 1,
          name: `${person.name.first} ${person.name.last}`,
          email: person.email,
          phone: person.phone,
          office: person.location.city,
          age: person.dob.age,
          startDate: new Date(person.registered.date).toLocaleDateString(),
        }));

        setRows(fetchedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        DealAmaze Project 2 - Data Table Using Axios
      </Typography>
      <DataTable rows={rows} columns={columns} />
    </Container>
  );
};

export default Home;
