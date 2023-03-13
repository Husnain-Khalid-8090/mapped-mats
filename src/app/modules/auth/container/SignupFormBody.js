import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  FormHelperText,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import InputMask from "react-input-mask";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import signup from "./signup";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { getDepartmentDetails } from "../services";
import FErrorMessage from "../../../shared/components/FErrorMessage";
function SignupFormBody({
  touched,
  values,
  errors,
  handleChange,
  handleSubmit,
  handleBlur,
  actionState,
  setActionState,
  loading,
  setCompanyName,
  companies,
  userLoading,
  toggle,
  setToggle,
  setFieldValue,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  let response = useSelector((state) => state.auth.departments.response);

  const getRegions = (companyCountry) => {
    switch (companyCountry) {
      case "United States":
        return [
          { value: "Washington", label: "Washington" },
          { value: "California", label: "California" },
        ];
      case "Canada":
        return [
          { value: "Alberta", label: "Alberta" },
          { value: "NovaScotia", label: "Nova Scotia" },
        ];
      default:
        null;
    }
  };

  const getUserRegions = (country) => {
    switch (country) {
      case "United States":
        return [
          { value: "Washington", label: "Washington" },
          { value: "California", label: "California" },
        ];

      case "Canada":
        return [
          { value: "Alberta", label: "Alberta" },
          { value: "NovaScotia", label: "Nova Scotia" },
        ];

      default:
        null;
    }
  };

  //  const  companies=[{
  //     id:1,
  //     company_name:"Next Js"
  //   },
  //   {
  //     id:2,
  //     company_name:"Devsinc"
  //   },
  //   {
  //     id:3,
  //     company_name:"pure Logics"
  //   },
  //   {
  //     id:4,
  //     company_name:"WebEvis"
  //   }]
  const companyHandleChange = (e) => {
    setCompanyName(e.target.value);
    setToggle(false);
    dispatch(getDepartmentDetails(e.target.value, toast));

  };

  const handleDepChange = (e) => {
    if (e.target.value == "Add New") {
    setToggle(true);
    } 
  };
  console.log("err", errors);
  console.log("touch", touched);
  return (
    <Box px={3}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <Typography color="text.secondary" variant="body2" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormControl fullWidth>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={actionState}
            onChange={(e) => setActionState(e.target.value)}
          >
            <div className={"signup "}>
              <FormControlLabel
                control={<Radio />}
                label="Sign Up as user"
                value="user"
              />
            </div>
            <div className={"signup"}>
              <FormControlLabel
                control={<Radio />}
                label="Sign Up as company"
                value="company"
              />
            </div>
          </RadioGroup>
        </FormControl>
        <Box
          sx={{ overflow: "auto", maxHeight: "50vh", marginRight: "-15px" }}
          pr={3}
        >
          {actionState === "user" ? null : (
            <>
              <Box py={2}>
                <Typography color="text.primary" variant="h6">
                  Company Information
                </Typography>
                <Divider />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="company_name"
                    value={values.company_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="filled"
                    error={touched.company_name && Boolean(errors.company_name)}
                    helperText={touched.company_name && errors.company_name}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    onBlur={handleBlur}
                    value={values.department}
                    onChange={handleChange}
                    error={touched.department && Boolean(errors.department)}
                    helperText={touched.department && errors.department}
                    variant="filled"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth variant="filled" required>
                    <InputLabel>Country</InputLabel>
                    <Select
                      name="companyCountry"
                      value={values.companyCountry}
                      onChange={(e) => {
                        const { value } = e.target;
                        const _regions = getRegions(value);
                        console.log(_regions);
                        setFieldValue("companyCountry", value);
                        setFieldValue("region", "");
                        setFieldValue("regions", _regions);
                      }}
                    >
                      {/* <MenuItem value=" ">Select country</MenuItem> */}
                      <MenuItem value="United States">United States</MenuItem>
                      <MenuItem value="Canada">Canada</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth variant="filled" required>
                    <InputLabel>Province</InputLabel>
                    <Select
                      name="companyProvince"
                      value={values.companyProvince}
                      onChange={handleChange}
                    >
                      {/* <MenuItem value=" ">Select Province</MenuItem> */}
                      {values.regions &&
                        values.regions.map((r) => (
                          <MenuItem key={r.value} value={r.value}>
                            {r.label}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    label="Address NTS"
                    variant="filled"
                    name="address_in_NTS"
                    type="number"
                    value={values.address_in_NTS}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      touched.address_in_NTS && Boolean(errors.address_in_NTS)
                    }
                    helperText={touched.address_in_NTS && errors.address_in_NTS}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    label="Address DLS"
                    variant="filled"
                    name="address_in_DLS"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address_in_DLS}
                    error={
                      touched.address_in_DLS && Boolean(errors.address_in_DLS)
                    }
                    helperText={touched.address_in_DLS && errors.address_in_DLS}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    label="Longitude"
                    variant="filled"
                    name="address_in_longitude"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address_in_longitude}
                    error={
                      touched.address_in_longitude &&
                      Boolean(errors.address_in_longitude)
                    }
                    helperText={
                      touched.address_in_longitude &&
                      errors.address_in_longitude
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    fullWidth
                    label="Latitude"
                    variant="filled"
                    type="number"
                    name="address_in_latitude"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address_in_latitude}
                    error={
                      touched.address_in_latitude &&
                      Boolean(errors.address_in_latitude)
                    }
                    helperText={
                      touched.address_in_latitude && errors.address_in_latitude
                    }
                    required
                  />
                </Grid> */}
              </Grid>
            </>
          )}

          <Box py={2}>
            <Typography color="text.primary" variant="h6">
              User Information
            </Typography>
            <Divider />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="First Name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="first_name"
                error={touched.first_name && Boolean(errors.first_name)}
                helperText={touched.first_name && errors.first_name}
                variant="filled"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={values.last_name}
                onBlur={handleBlur}
                onChange={handleChange}
                name="last_name"
                error={touched.last_name && Boolean(errors.last_name)}
                variant="filled"
                helperText={touched.last_name && errors.last_name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="filled" required>
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={values.country}
                  onChange={(e) => {
                    const { value } = e.target;
                    const _provinces = getUserRegions(value);
                    console.log(_provinces);
                    setFieldValue("country", value);
                    setFieldValue("provinces", "");
                    setFieldValue("provinces", _provinces);
                  }}
                >
                  {/* <MenuItem value=" ">Select country</MenuItem> */}
                  <MenuItem value="United States">United States</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="filled" required>
                <InputLabel>Province</InputLabel>
                <Select
                  name="province"
                  value={values.province}
                 
                  onChange={handleChange}
                >
                  {/* <MenuItem value="None">Select Province</MenuItem> */}
                  {values.provinces &&
                    values.provinces.map((p) => (
                      <MenuItem key={p.value} value={p.value}>
                        {p.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Address"
                value={values.address}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="filled"
                name="address"
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="filled"
                name="email"
                type="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <InputMask
                mask="+9 999 9999999"
                name="phone_number"
                autoComplete="phone_number"
                variant="filled"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone_number}
                required
              >
                {() => (
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone_number"
                    variant="filled"
                    value={values.phone_number}
                    error={touched.phone_number && Boolean(errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                    required
                  />
                )}
              </InputMask>
            </Grid>
            {actionState === "company" ? null : (
              <>
                {" "}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth variant="filled" required>
                    <InputLabel>Company Name</InputLabel>
                    <Select
                      name="company_name"
                      // value={company_name}
                      value={values.company_name}
                      // onChange={(e) => companyHandleChange(e)}
                      onChange={(e)=>{
                        companyHandleChange(e), setFieldValue("company_name", e.target.value);
                      }}
                    >
                      {companies?.map((company) => {
                        return (
                          <MenuItem key={company?.id} value={company?.id}>
                            {company?.company_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FErrorMessage name="company_name"/>
                  </FormControl>
                  <ToastContainer />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl fullWidth variant="filled" required>
                    <InputLabel>
                      {!toggle ? "Department Name" : "Create New Department"}
                    </InputLabel>
                    {!toggle ? (
                      <Select
                        name="department"
                        value={values.department}
                        error={touched.department && Boolean(errors.department)}
                        helperText={touched.department && errors.department}
                        // onChange={(e) => handleDepChange(e)}
                        onChange={(e)=>{
                          handleDepChange(e), setFieldValue("department", e.target.value);
                        }}
                      >
                        {response?.data?.departments.map((department) => {
                          return (
                            <MenuItem
                              key={department?.id}
                              value={department?.id}
                            >
                              {department?.name}
                            </MenuItem>
                          );
                        })}
                        <MenuItem value="Add New">Add New Department</MenuItem>
                      </Select>
                    ) : (
                      <TextField
                        fullWidth
                        name="department"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.department}
                        error={touched.department && Boolean(errors.department)}
                        helperText={touched.department && errors.department}
                        variant="filled"
                        required
                      />
                    )}
                  </FormControl>

                  <ToastContainer />
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Password"
                value={values.password}
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                variant="filled"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                value={values.confirmPassword}
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="confirmPassword"
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                variant="filled"
                required
              />
            </Grid>
          </Grid>
        </Box>
        {/* <Box pt={4}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Subscribe to receive emails"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="I agree to all the terms"
            />
          </FormGroup>
        </Box> */}
        <Button
          className="containedPrimary"
          variant="contained"
          sx={{ marginTop: "40px" }}
          onClick={handleSubmit}
        >
          {loading || userLoading ? (
            <ClipLoader size={25} color="white" loading />
          ) : (
            "Create Account"
          )}
        </Button>
        <ToastContainer />
      </form>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="body2">Already have an account?</Typography>
        <Button variant="text" onClick={() => history.push("/login")}>
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default SignupFormBody;
