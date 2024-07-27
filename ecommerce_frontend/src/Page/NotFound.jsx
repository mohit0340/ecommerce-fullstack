import React from "react";
import Navbar from "../Layout/Navbar";
import {  Typography } from "@mui/material";
import { styled } from '@mui/material/styles';



const NotFound = () => {
  return (
    <>
      <Typography
        component={"h2"}
        color={"red"}
        margin={"30px"}
        fontSize={"30px"}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        404 Not Found !!!
      </Typography>
    </>
  );
};

export default NotFound;
