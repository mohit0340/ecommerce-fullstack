import { ThemeProvider } from '@emotion/react'
import { createTheme, styled } from '@mui/material'
import React, { useContext } from 'react'
import { UserContext } from '../Context/Context'


const Cart = () => {
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
    <Container sx={{marginY:"30px"}}>
cart
  </Container>
</ThemeProvider>
  )
}

export default Cart
