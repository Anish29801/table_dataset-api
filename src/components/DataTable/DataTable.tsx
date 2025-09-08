import React, { useState, useMemo } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box, TextField, Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import { PersonRow } from "../../types";

interface DataTableProps {
  rows: PersonRow[];
  columns: GridColDef[];
}

const DataTable: React.FC<DataTableProps> = ({ rows, columns }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<PersonRow | null>(null);

  const filteredRows = useMemo(() => {
    if (!searchText) return rows;
    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [rows, searchText]);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedPerson(params.row as PersonRow);
  };

  const handleClose = () => {
    setSelectedPerson(null);
  };

  return (
    <Box sx={{ height: { xs: 500, sm: 600 }, width: "100%", mt: 4 }}>
      <TextField
        label="Search"
        placeholder="Type to search"
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          mb: 2,
          "& .MuiInputBase-input": { fontSize: { xs: 12, sm: 14 } },
          "& .MuiInputLabel-root": { fontSize: { xs: 12, sm: 14 } },
        }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <DataGrid
        rows={filteredRows}
        columns={columns}
        autoHeight
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
          sorting: { sortModel: [{ field: "id", sort: "asc" }] },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        filterMode="client"
        sortingMode="client"
        onRowClick={handleRowClick}
      />

      <Dialog open={!!selectedPerson} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Person Details</DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
          {selectedPerson && (
            <>
              <Typography variant="h6" sx={{ fontSize: { xs: 14, sm: 18 } }}>{selectedPerson.name}</Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>Email: {selectedPerson.email}</Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>Phone: {selectedPerson.phone}</Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>City: {selectedPerson.office}</Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>Age: {selectedPerson.age}</Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 14 } }}>Registered: {selectedPerson.startDate}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DataTable;
