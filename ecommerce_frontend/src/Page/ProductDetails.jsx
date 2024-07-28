import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Typography, Box, Button, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../Context/Context';

const ProductDetails = () => {
  const { darkMode, getProducts, product, CartUpdate, user, CartData } = useContext(UserContext);
  const { category, productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product) {
      getProducts().then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [product, getProducts]);

  useEffect(() => {
    if (user?._id) {
      CartData(user._id);
    }
  }, [user?._id]);

  useEffect(() => {
    if (product && product[category]) {
      const foundProduct = product[category].find((p) => p._id === productId);
      setCurrentProduct(foundProduct);
    }
  }, [product, category, productId]);

  const handleAddToCart = async () => {
    await CartUpdate({ userId: user?._id, productId: productId, quantity: 1, action: "add", message: "Item added to cart successfully" });
  };

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

  if (loading) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container sx={{ marginY: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Container>
      </ThemeProvider>
    );
  }

  if (!currentProduct) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container sx={{ marginY: '30px', textAlign: 'center' }}>
          <Typography variant="h5">Product not found</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ marginY: '30px' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, height: "500px" }}>
          <Box
            component="img"
            sx={{
              width: { xs: '100%', md: '50%' },
              height: '400px',
            }}
            alt={currentProduct.productname}
            src={`http://localhost:5000/${currentProduct.image.replace(/\\/g, '/')}`}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>{currentProduct.productname}</Typography>
            <Typography variant="h6" gutterBottom>{currentProduct.price} RS.</Typography>
            <Typography variant="body1" gutterBottom>{currentProduct.description}</Typography>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ProductDetails;
