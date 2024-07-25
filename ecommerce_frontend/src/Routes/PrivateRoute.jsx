import React, { useContext,useEffect,useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';
import ClipLoader from "react-spinners/ClipLoader";
import { blue } from '@mui/material/colors';





const PrivateRoute = ({  Component, roles }) => {
  const { user,getUserData } = useContext(UserContext);
  let [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  let token=localStorage.getItem('token')



  useEffect(()=>{

    if(!token){
        navigate("/login")
    }
    else{
        if(!user){
            let userdata= getUserData(token)
            if(!userdata){
            
             navigate("/login")
            }
        }
        
  
    }
  },[])



  if (roles && !roles.includes(user.role)) {
     navigate('/')
  }
  

  

  return <>{loading? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><ClipLoader
    color={blue}
    loading={loading}
  
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
    style={{}}
  /></div>:<Component />}</>
};

export default PrivateRoute;





// import React, { useContext, useEffect, useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { UserContext } from '../Context/Context';
// import ClipLoader from 'react-spinners/ClipLoader';
// import { blue } from '@mui/material/colors';

// const PrivateRoute = ({ Component, roles }) => {
//   const { user, getUserData } = useContext(UserContext);
//   const [loading, setLoading] = useState(true); // Start loading as true initially
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) {
//         navigate('/login');
//       } else {
//         try {
//           const userdata = await getUserData(token); // Ensure getUserData is an async function
//           if (!userdata) {
//             navigate('/login');
//           }
//         } catch (error) {
//           console.error(error);
//           navigate('/login');
//         } finally {
//           setLoading(false); // Set loading to false after attempting to fetch user data
//         }
//       }
//     };

//     fetchData();
//   }, [token, navigate, getUserData]);

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <ClipLoader
//           color={blue}
//           loading={loading}
//           size={150}
//           aria-label="Loading Spinner"
//           data-testid="loader"
//         />
//       </div>
//     );
//   }

//   if (roles && !roles.includes(user?.role)) {
//     return <Navigate to="/" />;
//   }

//   return <Component />;
// };

// export default PrivateRoute;
