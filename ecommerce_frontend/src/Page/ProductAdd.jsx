import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { Formik } from 'formik';
import * as Yup from 'yup';

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  productName: Yup.string().min(3, 'Product name must be at least 3 characters').required('Product name is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().min(1, 'Price must be at least 1').required('Price is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.mixed().required('Image is required')
});

const categories = ['Electronics', 'Books', 'Clothing', 'Furniture', 'Toys']; // Example categories

export default function ProductAdd() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (setFieldValue) => (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setFieldValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (values) => {
    // Add your add product logic here (e.g., API call)
    alert('Product Added Successfully', JSON.stringify(values, null, 2));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Typography variant="h5">P</Typography>
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Formik
            initialValues={{
              productName: '',
              category: '',
              price: '',
              description: '',
              image: null
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddProduct}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="productName"
                      label="Product Name"
                      name="productName"
                      autoComplete="product-name"
                      onChange={handleChange('productName')}
                      onBlur={handleBlur('productName')}
                      value={values.productName}
                      error={touched.productName && Boolean(errors.productName)}
                      helperText={touched.productName && errors.productName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      select
                      fullWidth
                      id="category"
                      label="Category"
                      name="category"
                      autoComplete="category"
                      onChange={handleChange('category')}
                      onBlur={handleBlur('category')}
                      value={values.category}
                      error={touched.category && Boolean(errors.category)}
                      helperText={touched.category && errors.category}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="price"
                      label="Price"
                      name="price"
                      type="number"
                      autoComplete="price"
                      onChange={handleChange('price')}
                      onBlur={handleBlur('price')}
                      value={values.price}
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      autoComplete="description"
                      multiline
                      rows={4}
                      onChange={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                    >
                      Upload Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload(setFieldValue)}
                      />
                    </Button>
                    {touched.image && errors.image && <Typography color="error">{errors.image}</Typography>}
                  </Grid>
                  {image && (
                    <Grid item xs={12}>
                      <Box
                        component="img"
                        sx={{
                          height: 233,
                          width: 350,
                          maxHeight: { xs: 233, md: 167 },
                          maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="Preview Image"
                        src={image}
                      />
                    </Grid>
                  )}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Product
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
