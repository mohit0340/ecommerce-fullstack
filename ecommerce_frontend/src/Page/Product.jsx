import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, Typography, Grid, CssBaseline } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import ProductCard from '../component/Card';
import { UserContext } from '../Context/Context';

const Product = () => {
  const { darkMode, getProducts, product } = useContext(UserContext);

  useEffect(() => {
    if (!product || Object.keys(product).length === 0) {
      getProducts();
    }
  }, [product, getProducts]);

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
      <Typography variant='h4' sx={{marginBottom:"20px"}}>Products</Typography>
        {product && Object.keys(product).length > 0 ? (
          Object.keys(product).map((category) => (
            <Typography key={category} component={'div'} sx={{marginBottom:"30px"}}>
              <Typography variant="h4" gutterBottom>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Typography>
              <Grid container spacing={2}>
                {product[category].map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <ProductCard product={item} />
                  </Grid>
                ))}
              </Grid>
            </Typography>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No products available
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Product;
