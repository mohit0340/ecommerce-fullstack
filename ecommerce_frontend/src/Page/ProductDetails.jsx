import { Container, CssBaseline } from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import React, { useContext } from 'react'
import { UserContext } from '../Context/Context';
const ProductDetails = () => {

  const {darkMode}=useContext(UserContext)


  const defaultTheme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: darkMode
              ? 'linear-gradient(71deg, #181818, #404040, #181818)'
              : 'linear-gradient(to right, #A7E6FF, white, #A7E6FF)',
            color: darkMode ? '#E2DFD0' : 'black',
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={ defaultTheme}>
      <CssBaseline></CssBaseline>
      <Container sx={{marginY:"30px"}}>
    <div>
      Product Details
    </div>
    </Container>
    </ThemeProvider>
  )
}

export default ProductDetails
