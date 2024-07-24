import React, { useContext } from 'react';
import {  Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

const PrivateRoute = ({ component: Component, roles }) => {
  const { user } = useContext(UserContext);
  const navigate=useNavigate()

  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated) {
    return navigate('/login')
  }

  if (roles && !roles.includes(user.role)) {
    return navigate('/')
  }

  return <Component />;
};

export default PrivateRoute;
