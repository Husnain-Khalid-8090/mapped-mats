import React from "react";
import '../verifyEmail/verifyEmail.scss';
import AuthLayout from "../../authLayout";
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import verifyEmail from "../../../../assets/images/verifyemail.svg";
import '../../../../../scss/components/_modal.scss';
import { useLocation } from "react-router-dom";


const style = {
    width: 800,
};
const VerifyEmail = ({match}) => {
    console.log(match.params,"sasasads")
    const location=useLocation()
    const email=location.state?.email
    const component=location.state.component
 

    console.log(email,"sdsasa")
    return (
        <AuthLayout>
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {component==="forgotPassword"?  <Box className={'modalUi'} sx={style}>
                    <img src={verifyEmail} width={'300px'}/>
                     <Typography id="modal-modal-description">
                        We have sent an resetPassword link to your email <b>{email}</b> go to your email and
                        click on that link to reset your Password
                    </Typography>
                  
                </Box>:  <Box className={'modalUi'} sx={style}>
                    <img src={verifyEmail} width={'300px'}/>
                     <Typography id="modal-modal-description">
                        We have sent an email verificaiton link to your email <b>{email}</b> go to your email and
                        click on that link to verify your email address
                    </Typography>
                  
                </Box>}
              
            </Modal>
        </AuthLayout>
    );
};
export default VerifyEmail;