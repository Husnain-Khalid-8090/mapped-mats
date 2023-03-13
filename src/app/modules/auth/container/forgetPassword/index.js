import React, { useEffect } from "react";
import AuthLayout from "../../authLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Formik } from "formik";
import { initialValues, Schema } from "./helper";
import { toast,ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getForgotPasswordDetails } from "../../services";
import { ClipLoader } from "react-spinners";


const ForgetPassword = () => {
    const history=useHistory()
    const dispatch=useDispatch()
    const loading = useSelector(
      (state) => state.auth.forgotPassword.loading
    );
    const error=useSelector(state=>state.auth.forgotPassword.error)
    
    useEffect(()=>{

    },[dispatch])
  return (
    <AuthLayout>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          debugger
          try {
           dispatch(getForgotPasswordDetails(values,history,toast))
            resetForm();
          } catch (e) {
 
  
          }
        }}
        validationSchema={Schema}
      >
        {(props) => (
          <Box px={3} flex={1}>
            <Box pb={4}>
              <Typography variant="h4" gutterBottom>
                Forget Password
              </Typography>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                No worries, We'll send you password reset instruction on your
                email
              </Typography>
            </Box>
            <form autoComplete="off" onSubmit={props.handleSubmit}>
              <Box py={2}>
                <TextField
                  fullWidth
                  label="Enter your Email"
                  name="email"
                  variant="filled"
                  type="email"
                  required
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                  value={props.values.email}
                  error={props.touched.email && Boolean(props.errors.email)}
                  helperText={props.touched.email && props.errors.email}
                />
              </Box>
              <Button
                className="containedPrimary"
                variant="contained"
                sx={{ marginTop: "40px" }}
                onClick={props.handleSubmit}
              >
               {loading ? (
            <ClipLoader size={25} color="white" loading />
          ) : (
            "Reset Password"
          )}  
              </Button>
              <ToastContainer/>
            </form>
            <Box
              pt={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button variant="text" onClick={() => history.push("/login")}>
                <ArrowBack /> Back to Login
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgetPassword;
