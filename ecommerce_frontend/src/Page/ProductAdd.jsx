import React, { useContext, useState, useEffect } from 'react';
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
import { UserContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  productName: Yup.string().min(3, 'Product name must be at least 3 characters').required('Product name is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().min(1, 'Price must be at least 1').required('Price is required'),
  description: Yup.string().required('Description is required'),
});

export default function ProductAdd() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const { darkMode, category, CategoryGet, AddProducts } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      CategoryGet();
    }
  }, [category, CategoryGet]);

  const handleImageUpload = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (values) => {
    const formData = new FormData();
    formData.append('productName', values.productName);
    formData.append('category', values.category);
    formData.append('price', values.price);
    formData.append('description', values.description);
    if (file) {
      formData.append('image', file);
    }

    const addata = await AddProducts(formData);
    if (addata) {
      navigate('/');
    }
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
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
            }}
            validationSchema={validationSchema}
            onSubmit={handleAddProduct}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                      sx={{
                        "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: darkMode ? "#E2DFD0" : "",
                        },
                        "& .MuiInputLabel-root": {
                          color: darkMode ? "#E2DFD0" : "",
                        },
                      }}
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
                      sx={{
                        "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: darkMode ? "#E2DFD0" : "",
                        },
                        "& .MuiInputLabel-root": {
                          color: darkMode ? "#E2DFD0" : "",
                        },
                      }}
                      onChange={handleChange('category')}
                      onBlur={handleBlur('category')}
                      value={values.category}
                      error={touched.category && Boolean(errors.category)}
                      helperText={touched.category && errors.category}
                    >
                      {category.length > 0 &&
                        category.map((option) => (
                          <MenuItem key={option._id} value={option.name}>
                            {option.name}
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
                      sx={{
                        "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: darkMode ? "#E2DFD0" : "",
                        },
                        "& .MuiInputLabel-root": {
                          color: darkMode ? "#E2DFD0" : "",
                        },
                      }}
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
                      sx={{
                        "& .MuiInputBase-root": { color: darkMode ? "#E2DFD0" : "" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: darkMode ? "#E2DFD0" : "",
                        },
                        "& .MuiInputLabel-root": {
                          color: darkMode ? "#E2DFD0" : "",
                        },
                      }}
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
                        onChange={handleImageUpload}
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
