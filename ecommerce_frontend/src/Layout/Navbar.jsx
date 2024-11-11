// import React, { useContext } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { UserContext } from '../Context/Context';
// import { Link , useNavigate } from 'react-router-dom';

// const adminPages = [
//   { label: 'Users', path: '/users' },
//   { label: 'Add Category', path: '/category/add' },
//   { label: 'Add Product', path: '/product/add' },
  
// ];
// const userPages = [
//   { label: 'Cart', path: '/cart' },
 
// ];
// const publicPages = [
//   { label: 'Login', path: '/login' },
//   { label: 'Register', path: '/register' }
// ];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// function Navbar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const navigate=useNavigate()

//   const { user } = useContext(UserContext);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const getNavPages = () => {
//     if (!user) return publicPages;
//     return user.role === 'admin' ? adminPages : userPages;
//   };

//   const HandleLogout=()=>{
//     localStorage.removeItem('token')
//     navigate('/login')
// }

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters 
//             >
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component={Link}
//             to={"/"}
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',

//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {getNavPages().map((page) => (
//                 <MenuItem key={page.label} onClick={handleCloseNavMenu} component={Link} to={page.path}>
//                   <Typography textAlign="center">{page.label}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
           

//              component={Link}
//             to={"/"}
          
//             sx={{
//                 cursor:"pointer",
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {getNavPages().map((page) => (
//               <Button
//                 key={page.label}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//                 component={Link}
//                 to={page.path}
//               >
//                 {page.label}
//               </Button>
//             ))}
//           </Box>

//           {user && (
//             <Box sx={{ flexGrow: 0 }}>
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 sx={{ mt: '45px' }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: 'top',
//                   horizontal: 'right',
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
               
//                   <MenuItem  onClick={handleCloseUserMenu}>
//                     <Typography component={'Link'} to="/profile" textAlign="center">Profile</Typography>
//                     <Typography component={'button'} onClick={HandleLogout}  textAlign="center">Logout</Typography>

//                   </MenuItem>
              
//               </Menu>
//             </Box>
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default Navbar;


import React, { useContext, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { UserContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const adminPages = [
  { label: 'Users', path: '/users' },
  { label: 'Add Category', path: '/category/add' },
  { label: 'Add Product', path: '/product/add' },
];
const userPages = [
  {  },
];
const publicPages = [
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user, darkMode,setUser, getUserData, setDarkMode, cart, CartData } = useContext(UserContext);

  const imagePath = user?.avatar?.replace(/\\/g, '/');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getNavPages = () => {
    if (!token) return publicPages;
    return user?.role === 'admin' ? adminPages : userPages;
  };

  useEffect(() => {
    if (!user) {
      getUserData(token);
    }
  }, [!user, getUserData, token]);

  useEffect(() => {
    if (!cart && user) {
      CartData(user._id);
    }
  }, [cart, CartData, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
   
    setTimeout(() => {
      setUser([])
      navigate('/login');
    }, 500);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: darkMode ? 'black' : '', color: darkMode ? '#E2DFD0' : 'inherit' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DHARVEE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {getNavPages().map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DHARVEE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {getNavPages().map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={page.path}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={darkMode?'Dark Mode':"Light Mode"}>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="secondary"
              inputProps={{ 'aria-label': 'toggle dark mode' }}
            /></Tooltip>
            {user.length!=0 && (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src={`https://ecommerce-fullstack-zfpe.onrender.com/${imagePath}`} />
                </IconButton>
              </Tooltip>
            )}
            {user?.role === 'user' && (
              <Tooltip title={`Total cart Item: ${cart.length}`}>
                <IconButton component={Link} to="/cart" color="inherit">
                  <Badge badgeContent={cart?.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component={Link} to="/profile" sx={{textDecoration:"none",color:"inherit"}} textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => { handleCloseUserMenu(); handleLogout(); }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
