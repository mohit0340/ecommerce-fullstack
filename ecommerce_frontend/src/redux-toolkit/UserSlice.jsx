// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const User = createSlice({
//   name: "user",
//   initialState: {},
//   reducers: {
//     userLogin: async (state, action) => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/auth/login", action.payload);
//         if (res.status === 200) {
//           const navigate = useNavigate(); // This should not be used here
//           state = { ...state, token: res.data.token };
//           toast.success(res.data.message);
//           localStorage.setItem("token", res.data.token);
//           navigate("/"); // Move this navigation logic to the component or dispatch an action instead
//         }
//       } catch (err) {
//         toast.error(err.response.data.message);
//         console.log(err);
//       }
//     },
//     userRegister: async (state, action) => {
//       const formData = new FormData();
//       formData.append('firstname', action.payload.firstname);
//       formData.append('lastname', action.payload.lastname);
//       formData.append('email', action.payload.email);
//       formData.append('password', action.payload.password);
//       formData.append('mobile', action.payload.mobile);
//       formData.append('avatar', action.payload.avatar);

//       try {
//         const res = await axios.post("http://localhost:5000/api/auth/register",
//           formData,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );
//         console.log(res);
//         if (res.status === 200) {
//           toast.success(res.data.message);
//           const navigate = useNavigate(); // This should not be used here
//           navigate("/login"); // Move this navigation logic to the component or dispatch an action instead
//         }
//       } catch (err) {
//         toast.error(err.response.data.message);
//         console.log(err);
//       }
//     },
//     getUserData: async (state) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const res = await axios.get("http://localhost:5000/api/auth/me", {
//             headers: {
//               'x-auth-token': token,
//             },
//           });
//           if (res.status === 200) {
//             state = { ...state, user: res.data.user };
//             console.log(res);
//           }
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     },
//   },
// });

// export const { getUserData, userLogin, userRegister } = User.actions;

// export default User.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const token = localStorage.getItem("token");

// Async thunk for user login
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (payload, { dispatch }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        payload,
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("loggedin", true);
        // localStorage.setItem("token", res.data.token);

        return res.data.token; // Return token as the fulfilled value
      } else {
        toast.error("Login failed");
        return Promise.reject("Login failed");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      return Promise.reject(err.response.data.message);
    }
  },
);

// Async thunk for user registration
export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (formData, { dispatch }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        return Promise.resolve("Registration successful");
      } else {
        toast.error("Registration failed");
        return Promise.reject("Registration failed");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      return Promise.reject(err.response.data.message);
    }
  },
);

// Async thuc for user update
export const userUpdate = createAsyncThunk(
  "user/userUpdate",
  async (formData, { dispatch }) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        },
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        return Promise.resolve("user updated successfully");
      } else {
        toast.error("user update failed");
        return Promise.reject("user update failed");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      return Promise.reject(err.response.data.message);
    }
  },
);

// Async thunk for getting user data
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { getState }) => {
    const token = getState().user.token; // Get token from Redux state
    if (token) {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          return res.data.user; // Return user data as the fulfilled value
        } else {
          return Promise.reject("Failed to fetch user data");
        }
      } catch (err) {
        return Promise.reject(err.message);
      }
    } else {
      return Promise.reject("Token not found");
    }
  },
);

export const userLogout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("token");
  localStorage.setItem("loggedin", false);

  return null;
});

// Define the user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    user: null,
    status: "idle", // idle, pending, succeeded, failed
    error: null,
    role: null,
  },
  reducers: {
    // No synchronous reducers needed here for login or registration
  },
  extraReducers: (builder) => {
    // Handle userLogin fulfilled and rejected actions
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });

    // Handle userRegister fulfilled and rejected actions

    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });

    // handle update user
    builder.addCase(userUpdate.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
    });
    builder.addCase(userUpdate.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });

    // handle logout
    builder.addCase(userLogout.fulfilled, (state) => {
      state.error = null;
      state.user = null;
      state.status = "idel";
      state.token = null;
      state.role = null;
    });

    // Handle getUserData fulfilled and rejected actions
    builder.addCase(getUserData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
      state.role = action.payload.role;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
  },
});

// Export actions
export const {} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
