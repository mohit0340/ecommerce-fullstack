import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  styled,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MuiOtpInput } from 'mui-one-time-password-input'
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";



const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  
  const {darkMode}=useContext(UserContext)
  const navigate=useNavigate()

  const sendOTP = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('https://ecommerce-fullstack-zfpe.onrender.com/api/users/forgot-password', { email: values.email });


      if(response.status==200){
        toast.success(response.data.message)
        setEmail(values.email);
        setSubmitting(false);
        setStep(1);
      }
      else{
        toast.error(response.data.message)
      }
    
    } catch (error) {
      setSubmitting(false);
      toast.error(error.response.data.message)
      setErrors({ email: error.response.data.message || 'Error sending OTP' });
    }
  };

  const verifyOTPAndChangePassword = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('https://ecommerce-fullstack-zfpe.onrender.com/api/users/update-password', { email, otp: values.otp, newPassword: values.newpassword });
      if(response.status== 200){
        toast.success(response.data.message)
        setSubmitting(false);
      
       navigate("/login");
      }
    // Go back to email form after success
    } catch (error) {
        toast.error(error.response.data.message)
      setSubmitting(false);
      setErrors({ otp: error.response.data.message || 'Error verifying OTP' });
    }
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
      <CssBaseline></CssBaseline>

   
    <Container sx={{ marginY: "30px" }}>
      <Typography variant="h4">Forgot Password</Typography>
      <Typography component={'div'} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {step === 0 ? (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            })}
            onSubmit={sendOTP}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="email"
                    type="email"
                    label="Email Address"
                    fullWidth
                    variant="outlined"
                    
                    helperText={<ErrorMessage style={{ color: 'red' }} name="email" />}
                    sx={{
                     
                      "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? "#E2DFD0" : "",
                      },
                      "& .MuiInputLabel-root": {
                        color: darkMode ? "#E2DFD0" : "",
                      }
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Send OTP
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ otp: "", newpassword: "", confirmnewpassword: "" }}
            validationSchema={Yup.object({
              otp: Yup.string().required("OTP is Required"),
              newpassword: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is Required"),
              confirmnewpassword: Yup.string()
                .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
                .required("Confirm Password is Required"),
            })}
            onSubmit={verifyOTPAndChangePassword}
          >
            {({ isSubmitting, setFieldValue, values, resetForm }) => (
              <Form>
                <Box mb={2}>
                  <MuiOtpInput
                    value={values.otp}
                    onChange={(value) => setFieldValue("otp", value)}
                    length={4}
                    sx={{
                     
                      "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? "#E2DFD0" : "",
                      },
                      "& .MuiInputLabel-root": {
                        color: darkMode ? "#E2DFD0" : "",
                      }
                    }}
                    width={'300px'}
                    separator={<span>-</span>}
                  />
                  <ErrorMessage name="otp" component="div" style={{ color: 'red' }} />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="newpassword"
                    type="password"
                    label="New Password"
                    fullWidth
                    sx={{
                     
                      "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? "#E2DFD0" : "",
                      },
                      "& .MuiInputLabel-root": {
                        color: darkMode ? "#E2DFD0" : "",
                      }
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage name="newpassword" component="div" style={{ color: 'red' }} />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    name="confirmnewpassword"
                    type="password"
                    label="Confirm New Password"
                    fullWidth
                    sx={{
                     
                      "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? "#E2DFD0" : "",
                      },
                      "& .MuiInputLabel-root": {
                        color: darkMode ? "#E2DFD0" : "",
                      }
                    }}
                    variant="outlined"
                  />
                  <ErrorMessage name="confirmnewpassword" component="div" style={{ color: 'red' }} />
                </Box>
                <Typography component={'div'} sx={{ display: "flex", gap: "30px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Change Password
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                </Typography>
              </Form>
            )}
          </Formik>
        )}
      </Typography>
    </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
