import axios from "axios";
import React, { createContext, useState } from "react";
import { userUpdate } from "../redux-toolkit/UserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GetCartdetails } from "../redux-toolkit/Cart";
import { useDispatch } from "react-redux";
import { useRadioGroup } from "@mui/material";


export const UserContext = createContext();

const Context = ({ children }) => {
  const [user, setUser] = useState("");
  const [product, setProduct] = useState("");
  const [darkMode,setDarkMode]=useState(false);
  const [progress,setProgress]=useState(false)
  const [cart, setCart] = useState('');
  const [usersData, setUsersData] = useState("");
  const [category,setCategory]=useState('')

  const token = localStorage.getItem("token");
  const dispatch=useDispatch()


  const CheckToken = async () => {
    try {
      if (token) {
        const res = await axios.get(
          "http://localhost:5000/api/auth/checktoken",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        if(res.status==200){
          return true
        }
       
      } else {
        return false;
      }
    } catch (err) {
      console.log("Failed to fetch user data", err);
      return false;
    }
  };

  const getUserData = async () => {
    setProgress(true)
    try {
      if (token) {
        const res = await axios.get("http://localhost:5000/api/users/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setProgress(false)
          setUser(res.data.user); // Return user data as the fulfilled value
        } else {
          setProgress(false)
          return console.log("Failed to fetch user data");
          
        }
      } else {
        setProgress(false)
        return console.log("token Missing", token);
      }
    } catch (err) {
      setProgress(false)
      return console.log("Failed to fetch user data");
    }
  };

  const UserLogin = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        values
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        getUserData(res.data.token);
   return true;
     
      } else {
        toast.error("Login failed");
        console.log("Login failed");
        return false;
      }
    } catch (err) {
    
      console.log("Login failed");
      toast.error(err.response?.data?.message);
      return false;
    }
  };

  const UserRegister = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        console.log("Registration successful");
        return true;
      } else {
        toast.error("Registration failed");
        console.log("Registration failed");
        return false;
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    }
  };
  

  const getProducts = async (categoryval,searchterm) => {
    setProgress(true)
    
    try {
    
      let res = await axios.get(`http://localhost:5000/api/products/`,{ params: {
        "category":categoryval,
        "searchTerm":searchterm
      }});
  
      if (res.status == 200) {
        
          setProgress(false)
          //   toast.success(res.data.message);
          setProduct(res.data.products);
    
    

        console.log(res);
        return true;
      }
      else{
        setProgress(false)
        return false;
      }
    } catch (err) {
      // toast.error(err.response.data.message);
      console.log(err);
      setProgress(false)
      return false;
    }
  };

  const AddProducts = async (formData) => {
    try {

      let res = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == 200) {
        toast.success(res.data.message);
        getProducts();
        return true;
      } else {
        console.log("Product add in error", res);
        return false;
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      return false;
    }
  };

  const DeleteProducts = async (id) => {
    try {

      let res = await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );
      if (res.status == 200) {
        toast.success(res.data.message);
        getProducts();
        return true;
      } else {
        console.log("Product Delete in error", res);
        return false;
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      return false;
    }
  };

  const UpdateProducts = async (id,formData) => {
    try {

      let res = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status == 200) {
        toast.success(res.data.message);
        getProducts();
        return true;
      } else {
        console.log("Product add in error", res);
        return false;
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      return false;
    }
  };

  const UpdateUser = async (id,formData) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        getUserData(token);
        console.log("user updated successfully");
        return true;
      } else {
        toast.error("user update failed");
        console.log("user update failed");
        return false;
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response.data.message);
      return false;
    }
  };

  const UpdateUserRole = async (role, UserId) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/admin",
        {role:role,Id:UserId},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        getUserData(token);
        console.log("user updated successfully");
        return true;
      } else {
        toast.error("user update failed");
        console.log("user update failed");
        return false;
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response.data.message);
      return false;
    }
  };

  const getUsersData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
   
        setUsersData(res.data.data)
        return true;
      } else {
        setUsersData("")
        console.log(res);
        return false;
      }
    } catch (err) {
      setUsersData("")
      console.error(err);
      return false;
    }
  };

  const CartUpdate = async ({userId, productId, quantity, action,message}) => {
    try {
      let res = await axios.post(
        "http://localhost:5000/api/cart/update",
        {userId:userId, productId:productId, quantity:quantity, action:action},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        toast.success(message);
        console.log(res);
        return true;
      } else {
        console.log(res);
        return false;
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      return false;
    }
  };

  const CategoryGet=async()=>{
    try{
       const res=await axios.get('http://localhost:5000/api/products/category')
       if(res.status==200){
        setCategory(res.data)
        return true;
        console.log(res)
       }
       else{
        return false;
       }
    }
    catch (err) {
      console.log(err)
      return false;
    }
  }

  const CategoryAdd=async(name)=>{
    try{
       const res=await axios.post('http://localhost:5000/api/products/category',{name:name.name},{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
       })
       if(res.status==200){
        toast.success(res.data.message)
        CategoryGet()
        return true;
       }
       else{
        toast.error(res.response.data.message)
        return false;
       }
    }
    catch (err) {
      toast.error(err.response.data.message)
      console.log(err)
      return false;
    }
  }
  

  const CartData=async(id)=>{
    setProgress(true)
      if(user?.role=="user"){
    try {
        let res = await axios.get(`http://localhost:5000/api/cart/${id}`
        //   {
        //   headers:{
        //     'Content-Type': 'application/json',
        //     "Authorization": `Bearer ${token}`
        //   }
        // }
        )

        console.log(res)
        if (res.status == 200) {
          setCart(res.data.cart.products)
          console.log(res)
          
          setProgress(false)
            
            
          
          return true;
        }else{
          setProgress(false)
          console.log(res);
          return false;
          
        }
      } catch (err) {
        setProgress(false)
        console.log(err);
        return false;
      }}
   
  }

  const UpdateCategory=async(id,name)=>{
    try{
       const res=await axios.put('http://localhost:5000/api/products/category',{id:id.id,name:name},{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        
       })
       if(res.status==200){
        toast.success(res.data.message)
        CategoryGet()
        return true;
       }
       else{
        toast.error(res.response.data.message)
        return false;
       }
    }
    catch (err) {
      toast.error(err.response.data.message)
      console.log(err)
      return false;
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        product,
        cart,
        usersData,
        progress,
        category,
        darkMode,
        setDarkMode,
        UpdateProducts,
        UpdateCategory,
        setProgress,
        CartData,
        setProduct,
        CategoryAdd,
        setUsersData,
        getUsersData,
        UpdateUserRole,
        setCart,
        setUser,
        DeleteProducts,
        getUserData,
        UserLogin,
        UserRegister,
        UpdateUser,
        getProducts,
        AddProducts,
        CheckToken,
        CategoryGet,
        CartUpdate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Context;
