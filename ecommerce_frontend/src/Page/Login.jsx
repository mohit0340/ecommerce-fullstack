import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Layout/Navbar";
import { userLogin } from "../redux-toolkit/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { UserContext } from "../Context/Context";



const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
    )
    .required("Password is required"),
});

export default function Login() {
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state) => state.user);

  const {  UserLogin,darkMode,getUserData } = React.useContext(UserContext);

  const HandleLogin = async (values) => {
    try {
      let data = await UserLogin(values);
      if (data) {
        // navigate('/')
         
        setTimeout(() => {
          navigate("/");
        }, 300);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      HandleLogin(values);
    },
  });

  const HandleShowpassword = () => {
    setVisible(!visible);
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
    <>
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
        <Container component="main" maxWidth="xs">
         
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>

            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    sx={{
                     
                      "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? "#E2DFD0" : "",
                      },
                      "& .MuiInputLabel-root": {
                        color: darkMode ? "#E2DFD0" : "",
                      },
                    }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={HandleShowpassword}
                          >
                            {visible ? (
                              <VisibilityIcon sx={{color: darkMode ? "#E2DFD0" : "" }} />
                            ) : (
                              <VisibilityOffIcon sx={{color: darkMode ? "#E2DFD0" : "" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
              </Grid>
              <Typography component={'div'} sx={{display:"flex",justifyContent:"flex-end"}}>
              <Link to={"/forgotpassword"} style={{textDecoration:"none"}}>Forgot Password</Link>
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color:darkMode?"#E2DFD0":"white",backgroundColor:darkMode?"#5065C0":""}}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
