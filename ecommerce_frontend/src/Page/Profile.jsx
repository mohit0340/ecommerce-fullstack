import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import EditNoteIcon from "@mui/icons-material/EditNote";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { UserContext } from "../Context/Context";




const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  borderRadius: "40px",
});

const validationSchema = Yup.object({
  firstname: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid First Name")
    .min(3, "Add atleast 3 Character First Name")
    .required("First Name is Required"),
  lastname: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid Last Name")
    .min(3, "Add atleast 3 Character Last Name")
    .required("Last Name is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),

  mobile: Yup.string()
    .matches(/^\d+$/, "Mobile number must be digits only")
    .min(10, "Mobile Number Must be 10 digits")
    .max(10, "Mobile Number Must be 10 digits")
    .required("Mobile Number is Required"),
  // avatar: Yup.mixed().required('Avatar is required'),
});

export default function Profile() {
  const [preview, setPreview] = React.useState(null);
  const { user, UpdateUser, getUserData,darkMode } = React.useContext(UserContext);

  const imagePath = user?.avatar?.replace(/\\/g, '/');
 
const token=localStorage.getItem('token')
 

  const HandleUpdateUser = async (values) => {
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);

    formData.append("mobile", values.mobile);
    if(values.avatar){
      formData.append("avatar", values.avatar);
    }
  
    try {
      let data = await UpdateUser(user?._id,formData);
      if (data) {
        getUserData();
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

React.useEffect(()=>{if(!user){getUserData()}},[user])

  const formik = useFormik({
    initialValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,

      mobile: user?.mobile,
      avatar: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      HandleUpdateUser(values);
    },
  });

  const handleFileChange = (event) => {
    const avatar = event.currentTarget.files[0];
    if (avatar) {
      formik.setFieldValue("avatar", avatar);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(avatar);
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
    <>
      <ThemeProvider theme={defaultTheme} >
      <CssBaseline/>
        <Container component="main" maxWidth="xs">
      
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <EditNoteIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Details
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    id="firstName"
                    label="First Name"
                    sx={{
                     
                      "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? "#E2DFD0" : "",
                      },
                      "& .MuiInputLabel-root": {
                        color: darkMode ? "#E2DFD0" : "",
                      },
                    }}
                    autoFocus
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstname &&
                      Boolean(formik.errors.firstname)
                    }
                    helperText={
                      formik.touched.firstname && formik.errors.firstname
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastname"
                    autoComplete="family-name"
                    sx={{
                    
                      "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? "#E2DFD0" : "",
                      },
                      "& .MuiInputLabel-root": {
                        color: darkMode ? "#E2DFD0" : "",
                      },
                    }}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastname && Boolean(formik.errors.lastname)
                    }
                    helperText={
                      formik.touched.lastname && formik.errors.lastname
                    }
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
                    value={formik.values.email}
                    sx={{
                      
                      "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? "#E2DFD0" : "",
                      },
                      "& .MuiInputLabel-root": {
                        color: darkMode ? "#E2DFD0" : "",
                      },
                    }}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="mobile"
                    label="Mobile"
                    type="text"
                    id="mobile"
                    autoComplete="new-mobile"
                    sx={{
                      
                      "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: darkMode ? "#E2DFD0" : "",
                      },
                      "& .MuiInputLabel-root": {
                        color: darkMode ? "#E2DFD0" : "",
                      },
                    }}
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* {preview && ( */}
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={
                        preview
                          ? preview
                          : `http://localhost:5000/${imagePath}`
                      }
                      alt="Selected Avatar"
                      height={200}
                      width={200}
                      style={{ borderRadius: "50%", objectFit: "contain" }}
                    />
                  </div>
                  {/* )} */}
                  <Button
                    component="label"
                    variant="contained"
                    sx={{color:darkMode?"#E2DFD0":"white",backgroundColor:darkMode?"#5065C0":""}}
                    startIcon={<CloudUploadIcon />}

                  >
                    Upload file
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formik.touched.avatar && formik.errors.avatar && (
                    <div style={{ color: "red", marginTop: 8 }}>
                      {formik.errors.avatar}
                    </div>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                
                variant="contained"
                sx={{ mt: 3, mb: 2,  color:darkMode?"#E2DFD0":"white",backgroundColor:darkMode?"#5065C0":"" }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
