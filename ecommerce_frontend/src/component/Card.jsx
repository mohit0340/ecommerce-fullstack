import React, { useState, useContext, useEffect } from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography, IconButton, Modal, Box, TextField, MenuItem, styled } from '@mui/material';
import { UserContext } from '../Context/Context';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';




const ProductCard = ({ product }) => {
  const { productname, image, description, price,_id } = product;
  const { user, darkMode,UpdateProducts ,category,CategoryGet,DeleteProducts,CartUpdate,CartData} = useContext(UserContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(`http://localhost:5000/${image.replace(/\\/g, '/')}`);
  const imagePath = image.replace(/\\/g, '/');

  const handleEditOpen = () => setEditModalOpen(true);
  const handleEditClose = () => setEditModalOpen(false);
  const handleDeleteOpen = () => setDeleteModalOpen(true);
  const handleDeleteClose = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    // Logic for deleting the product
    DeleteProducts(_id)
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validationSchema = Yup.object().shape({
    productname: Yup.string().required('Product name is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().required('Price is required'),
    description: Yup.string().required('Description is required'),
  });

useEffect(()=>{
  if(!category){
    CategoryGet()
  }

},[!category])


const HandleAddToCart=()=>{
const  data = CartUpdate({userId:user?._id, productId:_id, quantity:1, action:"add",message:"Item Added to cart Successfully"})
 if(data){
  CartData(user._id)
 } 
}


const editmodalstyle={
  backgroundColor: darkMode
  ? "linear-gradient(71deg, #181818,#404040,#181818)"
  : "linear-gradient(to right, #A7E6FF , white, #A7E6FF)",
color: darkMode ? "#E2DFD0" : "black",
}


  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: { xs: 'row', md: 'row', backgroundColor: darkMode ? "#404040" : "inherit", color: darkMode ? "#E2DFD0" : "inherit" } }}>
      <CardActionArea disableRipple>
        <CardMedia
          component="img"
          height="140"
          
          image={`http://localhost:5000/${imagePath}`}
          alt={productname}
          sx={{objectFit:"contain"}}
        />
        <Typography component={'div'} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productname}
            </Typography>
            {price && (
              <Typography variant="body2">
                Price: {price.toFixed(2)} RS.
              </Typography>
            )}
          </CardContent>
          <Typography sx={{ mr: '15px' }}>
            {user?.role === "admin" ?
              <>
                <IconButton size={'large'} color='primary' onClick={handleEditOpen}><EditRoundedIcon /></IconButton>
                <IconButton color='error' onClick={handleDeleteOpen}><DeleteForeverRoundedIcon /></IconButton>
              </> :
              <Button variant='contained' onClick={()=>HandleAddToCart()}>Add to Cart</Button>}
          </Typography>
        </Typography>
      </CardActionArea>

      {/* Edit Modal */}
      <Modal  open={editModalOpen} onClose={handleEditClose}>
        <Box sx={[editmodalstyle,{ position: 'absolute', top: '50%', left: '50%', height:"90vh",overflow:"scroll",transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }]}>
          <Typography variant="h6" component="h2">Edit Product</Typography>
          <Formik
            initialValues={{ productname, category: product.category, price, description }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              // Logic for updating the product
              const formData = new FormData();
              formData.append('productname', values.productname);
              formData.append('category', values.category);
              formData.append('price', values.price);
              formData.append('description', values.description);
              if (newImage) {
                formData.append('image', newImage);
              }

              // Replace this with your actual API call
              UpdateProducts(product._id,formData)

              handleEditClose();
            }}
          >
            {({ errors, touched, setFieldValue,handleChange,handleBlur,values }) => (
              <Form>
                <Field as={TextField} name="productname" label="Product Name" fullWidth margin="normal" error={touched.productname && !!errors.productname} helperText={touched.productname && errors.productname} />
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
                <Field as={TextField} name="price" label="Price" type="number" fullWidth margin="normal" error={touched.price && !!errors.price} helperText={touched.price && errors.price} />
                <Field as={TextField} name="description" label="Description" fullWidth margin="normal" error={touched.description && !!errors.description} helperText={touched.description && errors.description} />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    onChange={(event) => {
                      handleImageChange(event);
                      setFieldValue("image", event.currentTarget.files[0]);
                    }}
                  />
                </Button>
                {previewImage && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img src={previewImage} alt="Product Preview" style={{ maxHeight: 200 ,width:200}} />
                  </Box>
                )}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="contained" color="primary" type="submit">Update</Button>
                  <Button variant="contained" color="error" onClick={handleEditClose}>Cancel</Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={handleDeleteClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">Delete Product</Typography>
          <Typography sx={{ mt: 2 }}>Are you sure you want to delete this product?</Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error" onClick={()=>handleDelete()}>Delete</Button>
            <Button variant="outlined" onClick={handleDeleteClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default ProductCard;
