import React, { useEffect, useState } from 'react';
import { ThemeProvider, Container, createTheme, CssBaseline, Box, Typography, Card, CardContent, CardActions, Button, IconButton, Grid, CardMedia } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../Context/Context';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const { darkMode, getUserData, user, cart, CartData, CartUpdatet } = useContext(UserContext);
  const [subTotal, setSubTotal] = useState(0);
  const token = localStorage.getItem('token');

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

  useEffect(() => {
    if (!user) {
      getUserData(token);
    }
  }, [user]);

  useEffect(() => {
    if (!cart) {
      CartData(user?._id);
    }
  }, [cart]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setSubTotal(total);
    }
  }, [cart]);

  const handleIncreaseQuantity = (productId) => {
    updateCartItem(productId, cart.find(item => item.productId === productId).quantity + 1);
  };

  const handleDecreaseQuantity = (productId) => {
    const currentQuantity = cart.find(item => item.productId === productId).quantity;
    if (currentQuantity > 1) {
      updateCartItem(productId, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (productId) => {
    removeCartItem(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const getImagePath = (img) => {
    return img ? img.replace(/\\/g, '/') : '';
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ marginY: "30px" }}>
        <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
        {cart?.length > 0 ? (
          <>
            <Grid container spacing={2}>
              {cart.map(item => (
                <Grid item xs={12} sm={6} md={4} key={item.product.productId}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:5000/${getImagePath(item.product.image)}`}
                      alt={item.product.productname}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.product.productname}</Typography>
                      {/* <Typography variant="body2" color="textSecondary">{item.product.description}</Typography> */}
                      <Typography variant="body1">Price: {item.product.price} RS.</Typography>
                      <Typography variant="body1">Quantity: {item.quantity}</Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton onClick={() => handleDecreaseQuantity(item.product.productId)}>
                        <RemoveIcon />
                      </IconButton>
                      <IconButton onClick={() => handleIncreaseQuantity(item.product.productId)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveItem(item.product.productId)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Subtotal: {subTotal.toFixed(2)} RS.</Typography> 
              <Button variant="contained" color="secondary" onClick={handleClearCart}>Clear Cart</Button>
            </Box>
          </>
        ) : (
          <Typography variant="body1">Your cart is empty.</Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Cart;
