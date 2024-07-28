// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Product from '../Page/Product'
// import Login from '../Page/Login'
// import Register from '../Page/Register'
// import ProductAdd from '../Page/ProductAdd'
// import Profile from '../Page/Profile'
// import Users from '../Page/Users'
// import CategoryAdd from '../Page/CategoryAdd'
// import Cart from '../Page/Cart'
// import ProductDetail from "../Page/ProductDetails"
// import ForgotPassword from '../Page/ForgotPassword'
// import PrivateRoute from './PrivateRoute'


// const route = () => {
//   return (
//     <Routes>
//         {/* <Route path='/' Component={Product}></Route>
//         <Route path='/login' Component={Login}></Route>
//         <Route path='/register' Component={Register}></Route>
//         <Route path='/product' Component={Product}></Route>
//         <Route path='/product/add' Component={ProductAdd}></Route>
//         <Route path='/profile' Component={Profile}></Route>
//         <Route path='/users' Component={Users}></Route>
//         <Route path='/category/add' Component={CategoryAdd}></Route>
//         <Route path='/cart' Component={Cart}></Route>
//         <Route path='/product/:id' Component={ProductDetail}></Route>
//         <Route path='/forgotpassword' Component={ForgotPassword}></Route> */}
      
//         {/* Public Routes */}
      
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />

//         {/* Protected Routes */}
        
//         <Route path="/" element={<PrivateRoute component={Product} roles={['user', 'admin']} />} />
//       <Route path="/profile" element={<PrivateRoute component={Profile} roles={['user', 'admin']} />} />
//       <Route path="/product" element={<PrivateRoute component={Product} roles={['user', 'admin']} />} />
//       <Route path="/cart" element={<PrivateRoute component={Cart} roles={['user']} />} />
//       <Route path="/product/add" element={<PrivateRoute component={ProductAdd} roles={['admin']} />} />
//       <Route path="/category/add" element={<PrivateRoute component={CategoryAdd} roles={['admin']} />} />
//       <Route path="/users" element={<PrivateRoute component={Users} roles={['admin']} />} />
//       <Route path="/product/:id" element={<PrivateRoute component={ProductDetail} roles={['user']} />} />
       
      

      
//     </Routes>
//   )
// }

// export default route





import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Product from '../Page/Product';
import Login from '../Page/Login';
import Register from '../Page/Register';
import ProductAdd from '../Page/ProductAdd';
import Profile from '../Page/Profile';
import Users from '../Page/Users';
import CategoryAdd from '../Page/CategoryAdd';
import Cart from '../Page/Cart';
import ProductDetail from "../Page/ProductDetails";
import ForgotPassword from '../Page/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute Component={Login} />} />
      <Route path="/register" element={<PublicRoute Component={Register} />} />
      <Route path="/forgotpassword" element={<PublicRoute Component={ForgotPassword} />} />

      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute Component={Product} roles={['user', 'admin']} />} />
      <Route path="/profile" element={<PrivateRoute Component={Profile} roles={['user', 'admin']} />} />
      <Route path="/cart" element={<PrivateRoute Component={Cart} roles={['user']} />} />
      <Route path="/product/add" element={<PrivateRoute Component={ProductAdd} roles={['admin']} />} />
      <Route path="/category/add" element={<PrivateRoute Component={CategoryAdd} roles={['admin']} />} />
      <Route path="/users" element={<PrivateRoute Component={Users} roles={['admin']} />} />
      <Route path="/product/:category/:productId" element={<PrivateRoute Component={ProductDetail} roles={['user']} />} />
    </Routes>
  );
};

export default AppRoutes;
