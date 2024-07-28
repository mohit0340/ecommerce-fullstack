import React, { useContext, useState, useEffect } from 'react';
import {
  ThemeProvider,
  Container,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import { UserContext } from '../Context/Context';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CategoryAdd = () => {
  const { darkMode, CategoryAdd, CategoryGet, category, UpdateCategory } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    if (!category) {
      CategoryGet();
    }
  }, [category]);

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required('Category name is required'),
  });

  const handleCategorySubmit = async (values, { resetForm }) => {
    if (selectedCategory) {
      await UpdateCategory({ id: selectedCategory.id, name: values.categoryName });
      setSelectedCategory(null);
    } else {
      await CategoryAdd({ name: values.categoryName });
    }
    CategoryGet();
    resetForm();
  };

  const handleEditCategory = (id,name) => {
    setSelectedCategory({id:id,name:name});
  };

  const handleDeleteCategory = async (id) => {
    await UpdateCategory({ id });
    CategoryGet();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container sx={{ marginY: "30px" }}>
        <Typography variant="h4" gutterBottom>Add / Edit Category</Typography>
        <Formik
          initialValues={{ categoryName: selectedCategory ? selectedCategory.name : '' }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleCategorySubmit}
        
        >
          {({ errors, touched,resetForm,values }) => (
            <Form style={{ display: "flex", justifyContent: "center"}}>
              <Box display="flex" alignItems="center" mb={4} mt={3} sx={{ width: "50%", justifyContent: "center", flexDirection:"column" }}>
                <Field
                  as={TextField}
                  name="categoryName"
                  label="Category Name"
                  variant="outlined"
                  fullWidth
                  error={touched.categoryName && !!errors.categoryName}
                  helperText={touched.categoryName && errors.categoryName}
                  sx={{
                     
                    "& .MuiInputBase-root": { height: "50px", color: darkMode ? "#E2DFD0" : "" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "#E2DFD0" : "",
                    },
                    "& .MuiInputLabel-root": {
                      color: darkMode ? "#E2DFD0" : "",
                    },
                  }}
                  
                />
                <Typography component={'div'} sx={{mt:'20px',display:"flex",gap:"20px"}}>
                <Button variant="contained" color="primary" sx={{ height: "100%" }} type="submit">
                  {selectedCategory ? 'Update' : 'Add'}
                </Button>
                <Button  variant="contained" onClick={()=>{setSelectedCategory('')}} color="error" sx={{ height: "100%" }} type="reset">
                 reset
                </Button>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
        <TableContainer component={Paper}>
          <Table sx={{ color: darkMode ? "#E2DFD0" : "black" }}>
            <TableHead sx={{ backgroundColor: darkMode ? "#151515" : "inherit" }}>
              <TableRow>
                <TableCell sx={{ color: "inherit" }}>Category Name</TableCell>
                <TableCell align="right" sx={{ color: "inherit" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: darkMode ? "#404040" : "inherit" }}>
              {category && category.map((cat) => (
                <TableRow key={cat._id}>
                  <TableCell component="th" scope="row" onClick={() => handleEditCategory(cat)} sx={{ cursor: 'pointer', color: "inherit" }}>
                    {cat.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEditCategory(cat._id,cat.name)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteCategory(cat._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CategoryAdd;
