import React from "react";
import { Formik } from "formik";
import { initialValues, Schema } from "./helper";
import SigninFormBody from "./SigninFormBody";

function SigninForm({ onHandleSubmit,loading }) {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, { resetForm }) => {
        try {
          onHandleSubmit(values);
          // resetForm();
         
        } catch (e) {
         
        }
      }}
      validationSchema={Schema}
    >
      {(props) => {
        const { touched, values, errors, handleChange, handleSubmit,handleBlur } = props;

        return (
          <SigninFormBody
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
            loading={loading}

          />
        );
      }}
    </Formik>
  );
}

export default SigninForm;
