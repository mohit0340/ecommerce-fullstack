import React, { useEffect, useState, useContext } from 'react';
import { ThemeProvider, Container, createTheme, CssBaseline, Box, Typography, Card, CardContent, CardActions, Button, IconButton, Grid, CardMedia } from '@mui/material';
import { UserContext } from '../Context/Context';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const { darkMode, getUserData, user, cart, CartData, CartUpdate } = useContext(UserContext);
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
  }, [user, getUserData, token]);

  useEffect(() => {
    if (user) {
      CartData(user._id);
    }
  }, [user, CartData]);

  useEffect(() => {
    calculateSubtotal();
  }, [cart]);

  const calculateSubtotal = () => {
    if (cart && cart.length > 0) {
      const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setSubTotal(total);
    } else {
      setSubTotal(0);
    }
  };

  const handleIncreaseQuantity = async (_id) => {
    await CartUpdate({ userId: user?._id, productId: _id, quantity: 1, action: "increment", message: "Item quantity increased successfully" });
    CartData(user?._id);
  };

  const handleDecreaseQuantity = async (_id) => {
    await CartUpdate({ userId: user?._id, productId: _id, quantity: 1, action: "decrement", message: "Item quantity decreased successfully" });
    CartData(user?._id);
  };

  const handleRemoveItem = async (_id) => {
    await CartUpdate({ userId: user?._id, productId: _id, quantity: 1, action: "remove", message: "Item removed successfully" });
    CartData(user?._id);
  };

  const handleClearCart = async () => {
    await CartUpdate({ userId: user?._id, productId: '', quantity: '', action: "clear", message: "Cart cleared successfully" });
    CartData(user?._id);
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
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:5000/${getImagePath(item.product.image)}`}
                      alt={item.product.productname}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.product.productname}</Typography>
                      <Typography variant="body1">Price: {item.product.price} RS.</Typography>
                      <Typography variant="body1">Quantity: {item.quantity}</Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton onClick={() => handleDecreaseQuantity(item.product._id)}>
                        <RemoveIcon />
                      </IconButton>
                      <IconButton onClick={() => handleIncreaseQuantity(item.product._id)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveItem(item.product._id)}>
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
