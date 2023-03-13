import React from "react";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ToastContainer } from "react-toastify";
import { ClipLoader } from "react-spinners";
import Checkbox from "@mui/material/Checkbox";

const SigninFormBody = ({
  touched,
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  loading
}) => {
  const history = useHistory();
  return (
    <Box px={3} flex={1}>
      <Box pb={4}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Typography color="text.secondary" variant="body2" gutterBottom>
          Enter your Login Credentials
        </Typography>
      </Box>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Box py={2}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="filled"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            required
          />
        </Box>
        <Box py={2}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            variant="filled"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            value={values.password}
            required
          />
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
          <Button variant="text"onClick={()=>history.push('/forgetpassword')}>Forget Password?</Button>
        </Box>
        <Button className="containedPrimary"
          variant="contained"
          sx={{ marginTop: "40px" }}
          onClick={handleSubmit}
        >
   {loading ? (
            <ClipLoader size={25} color="white" loading />
          ) : (
            "Login"
          )}
        </Button>
        <ToastContainer/>
      </form>
      <Box
        pt={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="body2">Don't have an account yet?</Typography>
        <Button variant="text" onClick={() => history.push("/signup")}>
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default SigninFormBody;
