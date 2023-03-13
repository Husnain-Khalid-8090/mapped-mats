import API from "../config";
import URLS from "../../constants/urls";

/**
 * get starship details
 *
 * @param {Number} starshipId starship ID
 * @returns api response
 */
export const _getStarshipDetails = (starshipId) => {
  return API.get(`${URLS.GET_STARSHIP_DETAILS}${starshipId}/`);
};
export const _userSignUpDetails = (data) => {
  return API.post(`${URLS.USER_SIGNUP_DETAILS}`,data);
};
export const _userLoginDetails=(data)=>{
 
  return API.post(`${URLS.USER_LOGIN}`,data)
}

export const _companySignUpDetails = (data) => {

  return API.post(`${URLS.COMPANY_SIGNUP_DETAILS}`,data);
};
export const _getCompaniesDetails = () => {
  return API.get(`${URLS.GET_COMPANIES_DETAILS}`);
};
export const _getDepartmentDetails=(companyId)=>{
  return API.get(`${URLS.GET_DEPARTMENT_BY_COMPANY_ID}${companyId}/departments`);
}
export const _getEmailVerificationDetails=(id,string)=>{
  return API.get(`${URLS.EMAIL_VERIFICATION_REQUEST}${id}/${string}`)
}
export const _getForgotPasswordDetails=(email)=>{
  return API.post(`${URLS.FORGOT_PASSWORD_REQUEST}`,email)
}
export const _getResetPasswordDetails=(data)=>{
return API.post(`${URLS.RESET_PASSWORD_REQUEST}`,data)
}
export const _getUpdatePasswordDetails=(data)=>{
  return API.patch(`${URLS.UPDATE_PASSWORD_REQUEST}`,data)
  }
  export const _getUpdateProfileDetails=(data)=>{
    return API.patch(`${URLS.USER_PROFILE_REQUEST}`,data)
    }

export const _getAdminCompanies= async(search,status, page) => {

    return API.get(`${URLS.GET_ADMIN_COMPANIES}?search=${search ? search : ''}&status=${status ? status  : ''}&page=${page}`,{timeout:20000});


};


export const _updateAdminCompaniesStatus= async(data) => {

  return API.patch(`${URLS.GET_ADMIN_COMPANIES}/updateStatus`,data,{timeout:20000});


};