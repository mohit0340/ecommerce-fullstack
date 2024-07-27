import { ThemeProvider } from '@emotion/react';
import {
  Container, createTheme, Typography, Grid, CssBaseline, TextField, MenuItem, Box, Select, FormControl, InputLabel,
  
} 
from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import ProductCard from '../component/Card';
import { UserContext } from '../Context/Context';



const Product = () => {
  const { darkMode, getProducts, product, category,CategoryGet } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!product ) {
      getProducts();
    }
  }, [product]);
useEffect(()=>{
if(!category){
    CategoryGet()
}
},[category])




  const handleCategoryChange = (event) => {
    console.log(event.target.value)
    setSearchTerm('');
    getProducts(event.target.value=="all"?"":event.target.value)
    setSelectedCategory(event.target.value);
  };


    const handleSearchChange = (event) => {
      const searchValue = event.target.value;
      setSearchTerm(searchValue);
      getProducts(selectedCategory, event.target.value);
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
        <Box  alignItems="center" justifyContent="space-between" sx={{ marginBottom: "20px",display:'flex',flexDirection:{xs:'column',md:'row'},mb:{xs:'20px',md:''} }}>
          <Typography variant='h4' sx={{mb:{xs:'20px',md:''}}}>Products</Typography>
          <Box display="flex" gap={2}>
            <FormControl sx={{ minWidth: 120 }} size="small">
              {/* <InputLabel id="category-select-label" sx={{ color: darkMode ? "#E2DFD0" : "" }}>Category</InputLabel> */}
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                onChange={(e)=>handleCategoryChange(e)}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: darkMode ? "#E2DFD0" : "",
                  },
                  "& .MuiInputLabel-root": {
                    color: darkMode ? "#E2DFD0" : "",
                  },
                }}
              >
                <MenuItem value="all"defaultChecked={true} ><em>All</em></MenuItem>
                {category && category?.map((option) => (
                  <MenuItem key={option._id} value={option.name}>{option.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Search..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e)=>handleSearchChange(e)}
              sx={{
                "& .MuiInputBase-root": { height: "40px", color: darkMode ? "#E2DFD0" : "" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#E2DFD0" : "",
                },
                "& .MuiInputLabel-root": {
                  color: darkMode ? "#E2DFD0" : "",
                },
              }}
            />
          </Box>
        </Box>
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
