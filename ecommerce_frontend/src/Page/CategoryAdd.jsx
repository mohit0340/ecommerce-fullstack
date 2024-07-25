import React, { useContext } from 'react'
import { ThemeProvider } from '@emotion/react'
import { Container, createTheme, CssBaseline, styled } from '@mui/material'
import { UserContext } from '../Context/Context'



const CategoryAdd = () => {
const {darkMode}=useContext(UserContext)

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
    <Container sx={{marginY:"30px"}}>
  category add
  </Container>
</ThemeProvider>
  )
}

export default CategoryAdd
