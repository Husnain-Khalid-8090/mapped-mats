import React from "react";
import SigninForm from "./SigninForm";
import { useDispatch,useSelector } from "react-redux";
import {toast, ToastContainer}from'react-toastify'
import { useHistory } from "react-router-dom";
import "../signup/signup.scss";
import AuthLayout from "../../authLayout";

import { userLoginRequest } from "../../services";
import { useSelect } from "@mui/base";

const Signin = () => {
  const dispatch = useDispatch();
 const history=useHistory()
const loading=useSelector(state=>state.auth.userLogin.loading)
  const onHandleSubmit = (values) => {
    dispatch(userLoginRequest(values,history,toast));
  };
  return (
    <AuthLayout>
      <SigninForm onHandleSubmit={onHandleSubmit}loading={loading} />
      <ToastContainer/>
    </AuthLayout>
  );
};

export default Signin;
