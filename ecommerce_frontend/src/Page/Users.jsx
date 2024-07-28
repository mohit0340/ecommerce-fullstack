import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Avatar, Typography, CssBaseline, TextField, Box, TablePagination } from '@mui/material';
import { UserContext } from '../Context/Context';
import { styled } from '@mui/material/styles';

const Users = () => {
  const { darkMode, getUsersData, usersData, UpdateUserRole } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const updateRole = (role, userid) => {
    UpdateUserRole(role, userid);
    getUsersData(searchTerm);
  };

  useEffect(() => {
    getUsersData(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    getUsersData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const defaultTheme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: darkMode
              ? "linear-gradient(71deg, #181818,#404040,#181818)"
              : "linear-gradient(to right, #A7E6FF , white, #A7E6FF)",
            color: darkMode ? "#E2DFD0" : "black",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ marginY: "30px" }}>
        <Typography variant='h4' sx={{ marginBottom: "20px" }}>Users</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <TextField
            label="Search users..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              "& .MuiInputBase-root": { color: darkMode ? "#E2DFD0" : "" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: darkMode ? "#E2DFD0" : "",
              },
              "& .MuiInputLabel-root": {
                color: darkMode ? "#E2DFD0" : "",
              },
            }}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: darkMode ? "#151515" : "#D8D9DA", color: darkMode ? "#E2DFD0" : "inherit" }}>
              <TableRow>
                <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>Image</TableCell>
                <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>First Name</TableCell>
                <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>Last Name</TableCell>
                <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>Email</TableCell>
                <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>Mobile</TableCell>
                <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: darkMode ? "#303030" : "#ACB1D6", color: darkMode ? "#E2DFD0" : "inherit" }}>
              {usersData.length > 0 ? usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user._id}>
                  <TableCell><Avatar src={`http://localhost:5000/${user.avatar.replace(/\\/g, '/')}`} alt={`${user.firstname} ${user.lastname}`} /></TableCell>
                  <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>{user.firstname}</TableCell>
                  <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>{user.lastname}</TableCell>
                  <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>{user.email}</TableCell>
                  <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>{user.mobile}</TableCell>
                  <TableCell sx={{ color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center" }}>
                    <Select
                      value={user.role}
                      onChange={(e) => { updateRole(e.target.value, user._id) }}
                      sx={{
                        color: darkMode ? "#E2DFD0" : "inherit", textAlign: "center", width: "100px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: darkMode ? "#E2DFD0" : "",
                        },
                        "& .MuiInputLabel-root": {
                          color: darkMode ? "#E2DFD0" : "",
                        },
                      }}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={usersData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: darkMode ? "#E2DFD0" : "inherit" }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default Users;
