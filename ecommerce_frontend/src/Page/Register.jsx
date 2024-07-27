import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';



const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(3, 'First name must be at least 3 characters').required('First name is required'),
  lastName: Yup.string().min(3, 'Last name must be at least 3 characters').required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/\d/, 'Must contain a number')
    .required('Password is required'),
  mobile: Yup.string().matches(/^\d{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
  image: Yup.mixed().required('Image is required')
});

export default function Register() {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const { UserRegister, darkMode } = useContext(UserContext);
  const navigate=useNavigate()

  const handleShowPassword = () => {
    setVisible(!visible);
  };

  const handleRegister = (values) => {
    const formData = new FormData();
    formData.append('firstname', values.firstName);
    formData.append('lastname', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('mobile', values.mobile);
    formData.append('image', values.image);

 const registersuccess = UserRegister(formData);
 if(registersuccess){
    navigate('/login')
 }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ mb: '30px' }}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              mobile: '',
              image: null
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={visible ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      sx={{
                        "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: darkMode ? "#E2DFD0" : "",
                        },
                        "& .MuiInputLabel-root": {
                          color: darkMode ? "#E2DFD0" : "",
                        },
                      }}
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleShowPassword}
                            >
                              {visible ? (
                                <VisibilityIcon sx={{ color: darkMode ? "#E2DFD0" : "" }} />
                              ) : (
                                <VisibilityOffIcon sx={{ color: darkMode ? "#E2DFD0" : "" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile"
                      name="mobile"
                      type="number"
                      autoComplete="tel"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                      error={touched.mobile && Boolean(errors.mobile)}
                      helperText={touched.mobile && errors.mobile}
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
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setImage(URL.createObjectURL(file));
                          setFieldValue('image', file);
                        }}
                      />
                    </Button>
                    {touched.image && errors.image && <Typography color="error">{errors.image}</Typography>}
                  </Grid>
                  {image && (
                    <Grid item xs={12} sx={{ alignItems: "center", justifyContent: "center" }}>
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
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to={'/login'} variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
