import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Avatar, Typography } from '@mui/material';
import { UserContext } from '../Context/Context';

const Users = () => {
  const { darkMode ,getUsersData,usersData} = useContext(UserContext);




console.log(usersData)


  useEffect(()=>{
    if(!usersData){
        getUsersData()
    }

  },[usersData,getUsersData])



//   const handleRoleChange = (id, newRole) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === id ? { ...user, role: newRole } : user
//       )
//     );
//   };

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
      <Container sx={{ marginY: "30px" }}>
        <Typography variant='h4' sx={{marginBottom:"20px"}}>Users</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.length>0&&usersData.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell><Avatar src={user.avatar.replace(/\\/g, '/')} alt={`${user.firstname} ${user.lastname}`} /></TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                    //   onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Users;
