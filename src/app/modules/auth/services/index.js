import { createAction, handleActions } from "redux-actions";
import {
  _userSignUpDetails,
  _companySignUpDetails,
  _getCompaniesDetails,
  _getDepartmentDetails,
  _userLoginDetails,
  _getForgotPasswordDetails,
  _getResetPasswordDetails,
  _getUpdatePasswordDetails,
  _getUpdateProfileDetails,
  _getEmailVerificationDetails
} from "~shared/httpService/api";
import ActionTypes from "~shared/constants/actionTypes";
const initialState = {


  userSignupDetails: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  userLogin: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  companySignupDetails: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  companies: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  departments: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  emailVerification: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  forgotPassword: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  resetPassword: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  updatePassword: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
  updateProfile: {
    loading: false,
    response: {},
    hasError: false,
    error: {},
  },
};
/* User Signup */
export const userSignupDetailsStart = createAction(
  ActionTypes.USER_SIGNUP_DETAILS_START
);
export const userSignupDetailsSuccess = createAction(
  ActionTypes.USER_SIGNUP_DETAILS_SUCCESS,
  (response) => response
);
export const userSignupDetailsError = createAction(
  ActionTypes.USER_SIGNUP_DETAILS_ERROR,
  (error) => error
);

export const userSignupDetails =
  (
    values,
    company_name,
    department,
    setCompanyName,
    setDepartment,
    toggle,
    toast,
    history
  ) =>
  async (dispatch) => {
    const Obj = {
      email: values.email,
      password: values.password,
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone_number,
      country: values.country,
      province: values.province,
      address: values.address,
      company_id: values.company_name,
      department_id: values.department,
    };
    if (toggle) {
      Obj.department_id = { name: values.department };
    }

    try {
      dispatch(userSignupDetailsStart());

      const response = await _userSignUpDetails(Obj);

      dispatch(userSignupDetailsSuccess(response));
      setDepartment("");
      setCompanyName("");
       toast.success(response.message)
      history.push({
        pathname:'/verify',
        state:{
          email:values.email,
          component:'signup'
        }
      })
  
    } catch (error) {
      dispatch(userSignupDetailsError(error));

      if (error?.status.length > 0) {
        toast.error(error?.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

/* User Login */
export const userLoginStart = createAction(ActionTypes.USER_LOGIN_START);
export const userLoginSuccess = createAction(
  ActionTypes.USER_LOGIN_SUCCESS,
  (response) => response
);
export const userLoginError = createAction(
  ActionTypes.USER_LOGIN_ERROR,
  (error) => error
);

export const userLoginRequest =(values,history, toast) => async (dispatch) => {
    try {
      dispatch(userLoginStart());
      const response = await _userLoginDetails(values);
      dispatch(userLoginSuccess(response));
      toast.success(response?.message)
      setTimeout(()=>{
        if(response.data.role=='SuperAdmin'){
          history.push('/companies')
        }
        else{
          history.push('/profile')
        }
 
      },1000)
    } catch (error) {
      dispatch(userLoginError(error));
      if (error?.status.length > 0) {
        toast.error(error?.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

/* Company Signup */

export const companySignupDetailsStart = createAction(
  ActionTypes.COMPANY_SIGNUP_DETAILS_START
);
export const companySignupDetailsSuccess = createAction(
  ActionTypes.COMPANY_SIGNUP_DETAILS_SUCCESS,
  (response) => response
);
export const companySignupDetailsError = createAction(
  ActionTypes.COMPANY_SIGNUP_DETAILS_ERROR,
  (error) => error
);
export const companySignupDetails =
  (values, history, toast) => async (dispatch) => {
    const Obj = {
      company: {
        company_name: values.company_name,
        country: values.companyCountry,
        province: values.companyProvince,
        address: values.address,
        // address_in_NTS: `${values.address_in_NTS}`,
        // address_in_DLS: `${values.address_in_DLS}`,
        // address_in_longitude: `${values.address_in_longitude}`,
        // address_in_latitude: `${values.address_in_latitude}`,
      },
      user: {
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        phone_number: values.phone_number,
        country: values.country,
        province: values.province,
        address: values.address,
      },
      department: {
        name: values.department,
      },
    };

    try {
      dispatch(companySignupDetailsStart());

      const response = await _companySignUpDetails(Obj);
    
      dispatch(companySignupDetailsSuccess(response));
      toast.success(response.message);
      history.push({
        pathname:'/verify',
        state:{
          email:values.email,
          component:'signup'
        }
      })
      
    } catch (error) {
      dispatch(companySignupDetailsError(error));
      if (error?.status.length > 0) {
        toast.error(error?.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

/* GET Companies */

export const getCompaniesDetailsStart = createAction(
  ActionTypes.GET_COMPANIES_DETAILS_START
);
export const getCompaniesDetailsSuccess = createAction(
  ActionTypes.GET_COMPANIES_DETAILS_SUCCESS,
  (response) => response
);
export const getCompaniesDetailsError = createAction(
  ActionTypes.GET_COMPANIES_DETAILS_ERROR,
  (error) => error
);
export const getCompaniesDetails = (toast) => async (dispatch) => {
  try {
    dispatch(getCompaniesDetailsStart());
    const response = await _getCompaniesDetails();
    dispatch(getCompaniesDetailsSuccess(response));
    
  } catch (error) {
    dispatch(getCompaniesDetailsError(error));
   
    if (error?.status.length > 0) {
      toast.error(error?.error);
    } else {
      toast.error("Something went wrong");
    }
  }
  
};
/* GET Departments */
export const getDepartmentDetailsStart = createAction(
  ActionTypes.GET_DEPARTMENT_DETAILS_START
);
export const getDepartmentDetailsSuccess = createAction(
  ActionTypes.GET_DEPARTMENT_DETAILS_SUCCESS,
  (response) => response
);
export const getDepartmentDetailsError = createAction(
  ActionTypes.GET_DEPARTMENT_DETAILS_ERROR,
  (error) => error
);
export const getDepartmentDetails = (companyId, toast) => async (dispatch) => {
  try {
    dispatch(getDepartmentDetailsStart());
    const response = await _getDepartmentDetails(companyId);
    dispatch(getDepartmentDetailsSuccess(response));
  } catch (error) {
    dispatch(getDepartmentDetailsError(error));
    toast.error("Something Went Wrong");
  }
};

/*  FORGOT PASSWORD  */
export const forgotPasswordDetailsStart = createAction(
  ActionTypes.FORGOT_PASSWORD_DETAILS_START
);
export const forgotPasswordDetailsSuccess = createAction(
  ActionTypes.FORGOT_PASSWORD_DETAILS_SUCCESS,
  (response) => response
);
export const forgotPasswordDetailsError = createAction(
  ActionTypes.FORGOT_PASSWORD_DETAILS_ERROR,
  (error) => error
);

export const getForgotPasswordDetails = (values,history,toast) => async (dispatch) => {
  try {
    dispatch(forgotPasswordDetailsStart());
    const response = await _getForgotPasswordDetails(values);
    dispatch(forgotPasswordDetailsSuccess(response));
    history.push({
      pathname:'/verify',
      state:{
        email:values.email,
        component:'forgotPassword'
      }
    })
  } catch (error) {
    
    dispatch(forgotPasswordDetailsError(error));
    if (error?.status.length > 0) {
      toast.error(error?.error);
    } else {
      toast.error("Something went wrong");
    }

  }
};
/*Reset Password */
export const resetPasswordDetailsStart = createAction(
  ActionTypes.RESET_PASSWORD_DETAILS_START
);
export const resetPasswordDetailsSuccess = createAction(
  ActionTypes.RESET_PASSWORD_DETAILS_SUCCESS,
  (response) => response
);
export const resetPasswordDetailsError = createAction(
  ActionTypes.RESET_PASSWORD_DETAILS_ERROR,
  (error) => error
);

export const getResetPasswordDetails = (values,id,uniq,toast,history) => async (dispatch) => {
  
  const obj={
    userId:id,
    resetString:uniq,
    newPassword:values.confirmPassword
  }

  try {
    dispatch(resetPasswordDetailsStart());
    const response = await _getResetPasswordDetails(obj);
    dispatch(resetPasswordDetailsSuccess(response));
    toast.success(response.message)

setTimeout(()=>{
  history.push('/login')
},1000)

   

  } catch (error) {
    dispatch(resetPasswordDetailsError(error));
    if (error?.status.length > 0) {
      toast.error(error?.error);
    } else {
      toast.error("Something went wrong");
    }
    
  }
};

/*Update Password */
export const updatePasswordDetailsStart = createAction(
  ActionTypes.UPDATE_PASSWORD_DETAILS_START
);
export const updatePasswordDetailsSuccess = createAction(
  ActionTypes.UPDATE_PASSWORD_DETAILS_SUCCESS,
  (response) => response
);
export const updatePasswordDetailsError = createAction(
  ActionTypes.UPDATE_PASSWORD_DETAILS_ERROR,
  (error) => error
);

export const getUpdatePasswordDetails = (values) => async (dispatch) => {
  const newPassword={
    passwordCurrent:values.password,
    newPassword:values.confirmPassword
  }
  try {
    dispatch(updatePasswordDetailsStart());
    const response = await _getUpdatePasswordDetails(newPassword);
    dispatch(updatePasswordDetailsSuccess(response));
  } catch (error) {
    dispatch(updatePasswordDetailsError(error));
  }
};

/*Update Profile */
export const updateProfileDetailsStart = createAction(
  ActionTypes.UPDATE_PROFILE_DETAILS_START
);
export const updateProfileDetailsSuccess = createAction(
  ActionTypes.UPDATE_PROFILE_DETAILS_SUCCESS,
  (response) => response
);
export const updateProfileDetailsError = createAction(
  ActionTypes.UPDATE_PROFILE_DETAILS_ERROR,
  (error) => error
);

export const getUpdateProfileDetails = (values,toast) => async (dispatch) => {
  const obj={
    first_name:values.first_name,
    last_name:values.last_name,
    phone_number:values.phone_number,
    address:values.address,
  
    photo:values.file
  }
  try {
    dispatch(updateProfileDetailsStart());
    const response = await _getUpdateProfileDetails(obj);
    dispatch(updateProfileDetailsSuccess(response));
    toast.success(response.status)
  } catch (error) {
    dispatch(updateProfileDetailsError(error));
    if (error?.status.length > 0) {
      toast.error(error?.error);
    } else {
      toast.error("Something went wrong");
    }
  }
};


/*Email Verification */
export const emailVerificationDetailsStart = createAction(
  ActionTypes.EMAIL_VERIFICATION_DETAILS_START
);
export const emailVerificationDetailsSuccess = createAction(
  ActionTypes.EMAIL_VERIFICATION_DETAILS_SUCCESS,
  (response) => response
);
export const emailVerificationDetailsError = createAction(
  ActionTypes.EMAIL_VERIFICATION_DETAILS_ERROR,
  (error) => error
);

export const getEmailVerificationDetails = (id,string) => async (dispatch) => {
  try {
    dispatch(emailVerificationDetailsStart());
    const response = await _getEmailVerificationDetails(id,string);
    dispatch(emailVerificationDetailsSuccess(response));
    
  } catch (error) {
    dispatch(emailVerificationDetailsError(error));
    

  }
};

const reducer = handleActions(
  {
    [ActionTypes.USER_SIGNUP_DETAILS_START]: (state) => ({
      ...state,
      userSignupDetails: {
        ...state.userSignupDetails,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.USER_SIGNUP_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      userSignupDetails: {
        ...state.userSignupDetails,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.USER_SIGNUP_DETAILS_ERROR]: (state, action) => ({
      ...state,
      userSignupDetails: {
        ...state.userSignupDetails,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    [ActionTypes.USER_LOGIN_START]: (state) => ({
      ...state,
      userLogin: {
        ...state.userLogin,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.USER_LOGIN_SUCCESS]: (state, action) => ({
      ...state,
      user:action.payload.data,
      userLogin: {
        ...state.userLogin,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.USER_LOGIN_ERROR]: (state, action) => ({
      ...state,
      userLogin: {
        ...state.userLogin,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),

    [ActionTypes.COMPANY_SIGNUP_DETAILS_START]: (state) => ({
      ...state,
      companySignupDetails: {
        ...state.companySignupDetails,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.COMPANY_SIGNUP_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      companySignupDetails: {
        ...state.companySignupDetails,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.COMPANY_SIGNUP_DETAILS_ERROR]: (state, action) => ({
      ...state,
      companySignupDetails: {
        ...state.companySignupDetails,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.GET_COMPANIES_DETAILS_START]: (state) => ({
      ...state,
      companies: {
        ...state.companies,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_COMPANIES_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      companies: {
        ...state.companies,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_COMPANIES_DETAILS_ERROR]: (state, action) => ({
      ...state,
      companies: {
        ...state.companies,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.GET_DEPARTMENT_DETAILS_START]: (state) => ({
      ...state,
      departments: {
        ...state.departments,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_DEPARTMENT_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      departments: {
        ...state.departments,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.GET_DEPARTMENT_DETAILS_ERROR]: (state, action) => ({
      ...state,
      departments: {
        ...state.departments,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.FORGOT_PASSWORD_DETAILS_START]: (state) => ({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.FORGOT_PASSWORD_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.FORGOT_PASSWORD_DETAILS_ERROR]: (state, action) => ({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.RESET_PASSWORD_DETAILS_START]: (state) => ({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.RESET_PASSWORD_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.RESET_PASSWORD_DETAILS_ERROR]: (state, action) => ({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.UPDATE_PASSWORD_DETAILS_START]: (state) => ({
      ...state,
      updatePassword: {
        ...state.updatePassword,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.UPDATE_PASSWORD_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      updatePassword: {
        ...state.updatePassword,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.UPDATE_PASSWORD_DETAILS_ERROR]: (state, action) => ({
      ...state,
      updatePassword: {
        ...state.updatePassword,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.UPDATE_PROFILE_DETAILS_START]: (state) => ({
      ...state,
      updateProfile: {
        ...state.updateProfile,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.UPDATE_PROFILE_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      updateProfile: {
        ...state.updateProfile,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.UPDATE_PROFILE_DETAILS_ERROR]: (state, action) => ({
      ...state,
      updateProfile: {
        ...state.updateProfile,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
    [ActionTypes.EMAIL_VERIFICATION_DETAILS_START]: (state) => ({
      ...state,
      emailVerification: {
        ...state.emailVerification,
        loading: true,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.EMAIL_VERIFICATION_DETAILS_SUCCESS]: (state, action) => ({
      ...state,
      emailVerification: {
        ...state.emailVerification,
        response: action.payload,
        loading: false,
        hasError: false,
        error: {},
      },
    }),
    [ActionTypes.EMAIL_VERIFICATION_DETAILS_ERROR]: (state, action) => ({
      ...state,
      emailVerification: {
        ...state.updateProfile,
        error: action.payload,
        loading: false,
        hasError: true,
        response: {},
      },
    }),
  },

  initialState
);
export default reducer;
