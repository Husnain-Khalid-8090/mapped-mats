import React from "react";
import { ErrorMessage } from "formik";

const FErrorMessage = ({ name }) => {
  return (
    <div style={{ color: "red" }}>
      <br />
      <ErrorMessage name={name} />
    </div>
  );
};

export default FErrorMessage;