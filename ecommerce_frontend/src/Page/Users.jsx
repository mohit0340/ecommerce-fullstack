import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Avatar, Typography, CssBaseline } from '@mui/material';
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
        <CssBaseline></CssBaseline>
      <Container sx={{ marginY: "30px" }}>
        <Typography variant='h4' sx={{marginBottom:"20px"}}>Users</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{backgroundColor:darkMode?"#151515":"#D8D9DA",color:darkMode?"#E2DFD0":"inherit"}}>
              <TableRow >
              <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}} >Image</TableCell>
                <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}>First Name</TableCell>
                <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}>Last Name</TableCell>
                
                <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}>Email</TableCell>
                <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}>Mobile</TableCell>
                <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{backgroundColor:darkMode?"#303030":"#ACB1D6",color:darkMode?"#E2DFD0":"inherit"}}>
              {usersData.length>0&&usersData.map((user) => (
                <TableRow key={user._id} >
                  <TableCell><Avatar src={`http://localhost:5000/${user.avatar.replace(/\\/g, '/')}`} alt={`${user.firstname} ${user.lastname}`} /></TableCell>

                  <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}>{user.firstname}</TableCell>
                  <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}>{user.lastname}</TableCell>
                  <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}>{user.email}</TableCell>
                  <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}} >{user.mobile}</TableCell>
                  <TableCell sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}>
                    <Select
                      value={user.role}
                      sx={{color:darkMode?"#E2DFD0":"inherit",textAlign:"center"}}
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
