import * as Yup from "yup";

export const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  confirmPassword: "",
  address:"",
  country:"",
  province:"",
department:"",

};
export const UserSchema = Yup.object().shape({
  first_name: Yup.string().max(255)
    .min(3, "First Name must be at least 3 characters.")
    .required(" First Name is required!"),
  last_name: Yup.string().max(255)
    .min(3, "Last Name must be at least 3 characters.")
    .required(" Last Name is required!"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  phone_number: Yup.string().max(255).required("Phone number is required"),
  address:Yup.string().max(700).required("Address is Required"),
  country: Yup.string().max(255).required("Country is required"),
  province: Yup.string().max(255).required("Province is required"),
  department:Yup.mixed(),

  password: Yup.string().max(255).required('Password is required.')
  .min(8, 'Password is too short it should be 8 characters minimum.')
  .matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, 'Password must include one upper case, and at least one number.'),
confirmPassword: Yup.string().required('Provide confirm password').oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export const companyInitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  company_name: "",
  department: "",
  password: "",
  // address_in_NTS: "",
  // address_in_DLS: "",
  // address_in_longitude: "",  
  // address_in_latitude: "",
  confirmPassword: "",
  companyCountry: "",
  companyProvince: "",
  address:""
};
export const companySchema = Yup.object().shape({
  company_name: Yup.string().max(255)
    .min(3, "Name must be at least 3 characters.")
    .required(" Company Name is required!"),
  department: Yup.string().max(255).required("Department Name is required"),
  companyCountry: Yup.string().max(255).required("Country is required!"),
  companyProvince: Yup.string().max(255).required("Province is required!"),
  // address_in_NTS: Yup.number().required("Address NTS is required!"),
  // address_in_DLS: Yup.number().required("Address DLS is required!"),
  // address_in_longitude: Yup.number().required("Longitude is required!"),
  // address_in_latitude: Yup.number().required("Latitude is required!"),
  first_name: Yup.string().max(255)
    .min(3, "First Name must be at least 3 characters.")
    .required(" First Name is required!"),
  last_name: Yup.string().max(255)
    .min(3, "Last Name must be at least 3 characters.").max(255)
    .required(" Last Name is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
    address:Yup.string().max(700).required("Address is required"),
  phone_number: Yup.string().max(255).required("Phone number is required"),
  password: Yup.string().max(255).required('Password is required.')
  .min(8, 'Password is too short it should be 8 character minimum.')
  .matches(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, 'Password must include one upper case, and at least one number.'),
confirmPassword: Yup.string().required('Provide confirm password').oneOf([Yup.ref('password'), null], 'Passwords must match')
}); 
