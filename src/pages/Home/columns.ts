import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70, sortable: true },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "office", headerName: "City", width: 150 },
  { field: "age", headerName: "Age", width: 100 },
  { field: "startDate", headerName: "Registered Date", width: 150 },
];
