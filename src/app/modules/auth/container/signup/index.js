import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignupForm from "../SignupForm";
import AuthLayout from "../../authLayout";
import { toast, ToastContainer } from "react-toastify";
import {
  companySignupDetails,
  getCompaniesDetails,
  userSignupDetails,
} from "../../services";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [toggle, setToggle] = useState(false);
  const [actionState, setActionState] = useState("user");
  const [company_name, setCompanyName] = useState("");
  const [department, setDepartment] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.auth.companySignupDetails.loading
  );

  const response = useSelector(
    (state) => state.auth.companySignupDetails.response
  );

  const userLoading = useSelector(
    (state) => state.auth.userSignupDetails.loading
  );
  const userResponse = useSelector(
    (state) => state.auth.companySignupDetails.response
  );
 

  const companyResponse = useSelector((state) => state.auth.companies.response);


  useEffect(() => {
    if (actionState === "user") {
      dispatch(getCompaniesDetails(toast));
    }
  }, [actionState, dispatch]);

  const onHandleSubmit = (values) => {
    if (actionState === "company") {
      dispatch(companySignupDetails(values, history, toast));
    } else {
      dispatch(
        userSignupDetails(
          values,
          company_name,
          department,
          setCompanyName,
          setDepartment,
          toggle,
          toast,
          history
        )
      );
    }
  };
  return (
    <AuthLayout>
      {" "}
      <SignupForm
        onHandleSubmit={onHandleSubmit}
        actionState={actionState}
        setActionState={setActionState}
        loading={loading}
        userLoading={userLoading}
        companies={companyResponse?.data?.companies}
        company_name={company_name}
        setCompanyName={setCompanyName}
        department={department}
        setDepartment={setDepartment}
        toggle={toggle}
        setToggle={setToggle}
      />
      <ToastContainer />
    </AuthLayout>
  );
};

export default Signup;
