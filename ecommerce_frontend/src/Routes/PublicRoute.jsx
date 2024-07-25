// import React, { useContext, useEffect } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { UserContext } from '../Context/Context';


// const PublicRoute = ({  Component }) => {
//   const { user ,getUserData} = useContext(UserContext);
//   const token=localStorage.getItem('token')
//   const navigate=useNavigate()


// //   useEffect(()=>{
//     if(!token){
//         return <Component />;
       
//       }
//       else{
//         if(!user){
//         let userdata= getUserData(token)
//         if(!userdata){
//             return <Component />;
         
//         }
//         else{
//          return   navigate('/')
//         }
//     }
//       }
// //   },[navigate,])
  
  

  

// //   if (token&&user) {
// //     return <Navigate to="/" />;
// //   }
// //   else{
// //     return <Component />;
// //   }


// };

// export default PublicRoute;




import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

const PublicRoute = ({ Component }) => {
  const { user, getUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        const userdata = await getUserData(token);
        if (userdata) {
          navigate('/');
        }
      }
      setLoading(false);
    };

    checkUser();
  }, [token, navigate, getUserData]);

  if (loading) {
    return null; // or a loading spinner if you prefer
  }

  if (token && user) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PublicRoute;
