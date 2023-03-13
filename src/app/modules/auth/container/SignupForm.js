import React from "react";
import { Formik } from "formik";
import {
  initialValues,
  companyInitialValues,
  UserSchema,
  companySchema,
} from "./helper";
import SignupFormBody from "./SignupFormBody";
function SignupForm({ 
  onHandleSubmit,
   actionState,
    setActionState,
    loading,
  userLoading,
  companies,
  company_name,
  setCompanyName,
  department,
  setDepartment,
  toggle,
  setToggle
}) {

  return (
    <Formik
      initialValues={
        actionState === "user" ? initialValues : companyInitialValues
      }
     
enableReinitialize={true}
      onSubmit={(values, { resetForm }) => {
        try {
          onHandleSubmit(values);
     
          // resetForm();
        } catch (e) {
          console.log(e, "Error>>>");
       
        }
      }}
      validationSchema={actionState === "user" ? UserSchema : companySchema}
    >
      {(props) => {
        const { touched, values, errors, handleChange, handleSubmit,handleBlur,setFieldValue} = props;
        console.log(values, "SignupValues>>>>>>>>>");

        return (
          <SignupFormBody
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            actionState={actionState}
            setActionState={setActionState}
            loading={loading}
            userLoading={userLoading}
            company_name={company_name}
            setCompanyName={setCompanyName}
            companies={companies}
            department={department}
            setDepartment={setDepartment}
            toggle={toggle}
            setToggle={setToggle}
            setFieldValue={setFieldValue}
     
          />
        );
      }}
    </Formik>
  );
}

export default SignupForm;
