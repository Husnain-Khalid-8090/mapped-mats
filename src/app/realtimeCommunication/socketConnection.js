import  io  from "socket.io-client";
import {store} from "../redux/store";
import {

    getAdminCompanies,
} from '../modules/adminDashboard/services';
import {ToastContainer, toast} from "react-toastify";
let socket = null

export const connectionWithSocketServer = (userDetails)  => {

    const jwtToken  =  userDetails.token
    console.log('jwtToken',jwtToken)
    socket = io('http://localhost:8000',{
        auth:{
            token:jwtToken
        }
    })


    socket.on('connect', () =>{
        console.log('Successfully connected socket server')
        console.log(socket.id)
    });

    socket.on('company_sign_up_notification',(data)=>{
        const {notification_for,message} =data

        console.log('friends invitations event came')
      let id =  store?.getState()?.auth?.user ? store?.getState()?.auth?.user?.id : ''
        if(notification_for.includes(id)) {
            store.dispatch(getAdminCompanies('', '', ''))
               toast(message)
        }
    });
}