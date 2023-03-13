import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../modules/home/container";
import { useSelector } from 'react-redux';
import {Layout} from "../shared/components/layout/container";
import Signup from "../modules/auth/container/signup";
import Signin from '../modules/auth/container/signin';
import VerifyEmail from "../modules/auth/container/verifyEmail";
import ConfirmEmail from "../modules/auth/container/confirmEmail";
import ForgetPassword from "../modules/auth/container/forgetPassword";
import ResetPassword from "../modules/auth/container/resetPassword";
import AdminDashboard, { Admin } from "../modules/adminDashboard";
import Companies from "../modules/adminDashboard/companies";
import Users from '../modules/adminDashboard/users'
import ProfileSettings from "../modules/adminDashboard/profileSettings";
import {Redirect, useHistory} from 'react-router-dom';
/**
 * Application main router component
 *
 * contains all the available routes and components in the application
 */

const Router  =  ({match}) => {

    const auth = useSelector(state => state.auth);

    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/forgetpassword" component={ForgetPassword}/>
            <Route exact path="/verify/:id/:uniqueString" component={ConfirmEmail}/>
            <Route exact path="/signup"component={Signup}/>
            <Route exact path="/login"component={Signin}/>
            <Route exact path="/verify" component={VerifyEmail}/>
            <Route exact path='/resetPassword/:id/:uniqueString'component={ResetPassword}/>
            <Route exact path="/" component={Home} />
              {/*  <Route exact path="/home" component={Home} />*/}
                <RestrictedRoute exact path="/dashboard" component={AdminDashboard}   auth={auth} routeName ='dashboard'/>
                <RestrictedRoute exact path="/users" component={Users}   auth={auth} routeName ='users'/>
                  <RestrictedRoute exact path="/companies"component={Companies} auth={auth} routeName ='companies'/>
            <RestrictedRoute exact path="/profile" component={ProfileSettings}   auth={auth} routeName ='profile'/>
            <RestrictedRoute exact path="/reports" component={AdminDashboard}   auth={auth} routeName ='reports'/>
                {/* {isLogin() ? <Admin /> : <Redirect to="/login" />} */}

         
        </Switch>
      </BrowserRouter>
    );
  };



const  renderedComponent = (user, roles,Component,props,name) => {

    // if(user && user.id){
       if(true){
        return <Layout name={name}><Component {...props} /></Layout>

    }else if(user && user.id) {
        return <>Page not Found</>
    }


}



const RestrictedRoute = ({ component: Component, auth: { user },roles,routeName, ...rest }) => {

    return <Route
        {...rest}
        render={props =>renderedComponent(user,roles,Component,props,routeName)
            // user?.id
            //     ? renderedComponent(user,roles,Component,props,routeName)
                // : <Redirect to="/login" />
        }
    />;
};
export default Router;





