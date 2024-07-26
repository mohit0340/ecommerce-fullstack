import React, { useContext } from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, Icon, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { UserContext } from '../Context/Context';
import NotFound from '../Page/NotFound';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';






const ProductCard = ({ product }) => {
  const { productname, image, description, price } = product;
  const {user,darkMode}=useContext(UserContext)
  const imagePath = image.replace(/\\/g, '/');
 

  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: { xs: 'row', md: 'row',backgroundColor:darkMode?"#404040":"inherit",color:darkMode?"#E2DFD0":"inherit" } }} >
      <CardActionArea TouchRippleProps={{ classes: { root: 'disable-ripple' } }} disableRipple>
        <CardMedia
          component="img"
          height="140"
          
        
          image={`http://localhost:5000/${imagePath}`}
          alt={productname}
          

        />
        <Typography component={'div'} sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productname}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {description}
          </Typography> */}
          {price && ( // Conditionally render price section
            <Typography variant="body2">
              Price : {price.toFixed(2)} RS.
            </Typography>
          )}
        </CardContent>
        <Typography sx={{mr:'15px'}}>{user?.role=="admin"?<><IconButton size={'large'} component={'button'} color='primary'><EditRoundedIcon></EditRoundedIcon></IconButton><IconButton component={'button'} color='error'><DeleteForeverRoundedIcon></DeleteForeverRoundedIcon></IconButton></>:<Button variant='contained'>add To cart</Button>}</Typography>
        </Typography>
     
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
