import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css'
import { facebookSignIn, googleSignIn, inititliazeLoginFramework, signOut, signIn, signUp, githubSignIn, updateUsername, storeAuthToken } from './Loginmanager';
import Header from '../Header/Header';
import { useForm } from 'react-hook-form';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [authState, setAuthState] = useState(true);

  const [user, setUser] = useState({
    isSignedIn: false,
    displayName: '',
    photo: '',
    error: '',
    email: ''
  })

  inititliazeLoginFramework();//import firebase from login mananger

  const handleChange = event => {
    let isFormValid;
    if (event.target.name === 'displayName') {
      isFormValid = /^[a-zA-Z\s\.]*$/.test(event.target.value);
      console.log(isFormValid)
    }
    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isFormValid)
    }
    if (event.target.name === 'password') {
      isFormValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(event.target.value);
      //one upper case,one lower case,one digit,one special character
      console.log(isFormValid)
    }
    if (event.target.name === 'repassword') {
      isFormValid = (event.target.value === user.password)
      console.log(isFormValid, "isform valid")
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      newUserInfo.isValid = isFormValid;
      console.log(user.isValid, "isValid")
      setUser(newUserInfo);
    }
  }
  const onSubmit = (data) => {
    if (!authState && user.email && user.password) { //new user 
      if (user.password === user.repassword) {
        signUp(user.email, user.password)
          .then(res => {
            handleResponse(res, true)
            updateUsername(user.displayName)
            console.log(user.displayName,"silvia why error")
          })
          .catch(error => console.log(error))
      }
    }
    if (authState) { //old user
      signIn(user.email, user.password)
        .then(res => {
          handleResponse(res, true)
        })
        .catch(error => console.log(error))
    }
    console.log(user.email, user.password, "silvia")
  }

  //1 Sign IN

  const handlesignOut = () => {
    signOut()
      .then(res => {
        handleResponse(res, false)
      })
  }
  //1
  const handlegoogleSignIn = () => {
    googleSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  }
  const handlefacebookSignIn = () => {
    facebookSignIn()
      .then(res => {
        handleResponse(res, true)
      })
      .catch(error => console.log(error))
  }
  const handlegithubSignIn = () => {
    githubSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  }
  const handleResponse = (res, redirect) => {
    if (redirect === true) {
      setUser(res);
      setLoggedInUser(res);
      storeAuthToken()
      history.replace(from)
    }
    else {
      setUser(res);
      setLoggedInUser(res);
    }
  }

  return (
    <div className="">
      {!user.isSignedIn &&
        <div className="row container  rowLogin w-50 m-auto d-flex justify-content-center align-items-center flex-column">
          <div className="col-md-12 cardSignStyle p-4 mt-5">
            {authState ? <h5>Login</h5> : <h5 className=" ">Sign Up</h5>}

            <form onSubmit={handleSubmit(onSubmit)} id="formsignup" className="">
              {!authState && <input type="text" onBlur={handleChange} name="displayName" placeholder="Your Name" id="inputName" className="form-control mt-3"
                ref={register({ required: true, pattern: {
                  value:/^[a-zA-Z\s\.]*$/,
                  message:"*Please Provide a valid name using  only alphabet" },})} />}
              {errors.displayName && <span className="error">{errors.displayName.message}</span>}



              <input type="email" onBlur={handleChange} name="email" placeholder="Your Email" id="inputEmail" className="form-control mt-3" 
                 ref={register({ required:"*Email is required",
                 pattern: {
                  value: /\S+@\S+\.\S+/,
                  message:"*Please Provide a valid Email" },})} />
              {errors.email && <span className="error">{errors.email.message} </span>}

              <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" id="inputPassword" className="form-control mb-2 mt-2"
                ref={register({ required:"*Password is required",
                pattern: {
                 value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                 message:"*one upper case,one lower case,one digit,one special character" },})}  />
              {errors.password && <span className="error">{errors.password.message}</span>}

              {!authState && <input type="password" onBlur={handleChange} name="repassword" placeholder="Confirm Password" id="inputPassword" className="form-control mb-2 mt-2" required />}
              {authState ? <input type="submit" value="Sign In" className="btn btn-lg w-100 btn-primary" /> :
                <input type="submit" value="Sign Up" className="btn btn-lg w-100 btn-primary" />
              }
            </form>
            {
              authState ?
                <h6 className="fw-light mt-1">Don't Have an account?<a className="loginAnchor fw-bold fw-lighter  btn text-decoration-none text-warning" onClick={() => setAuthState(!authState)}> Sign Up</a> </h6> :
                <h6 className="fw-light mt-1">Already Have an account?<a className="loginAnchor btn fw-bold text-decoration-none text-warning " onClick={() => setAuthState(!authState)}> Sign In</a></h6>
            }
          </div>

          {
            loggedInUser.error && <p className="text-warning">{loggedInUser.error}</p>
          }
          {
            user.isSignedIn && <p className="text-primary">Welcome{user.email}</p>
          }

          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <hr className="w-50 hrStyle" />
            <p className=" mx-2">OR</p>
            <hr className="hrStyle w-50" />
          </div>
          <div className="col-md-12  " id="handlebutton">
            <button onClick={handlegoogleSignIn} className="btn btn-lg w-100 mt-2 buttonText" style={{ color: 'white', backgroundColor: '#179C52' }} ><FontAwesomeIcon className="iconSize" icon={faGoogle} /> Google Sign In</button><br />
            <button onClick={handlefacebookSignIn} className="btn btn-lg w-100 mt-2 buttonText" style={{ color: 'white', backgroundColor: '#4267B2' }}><FontAwesomeIcon className="iconSize" icon={faFacebook} /> Facebook Sign In</button><br />
            <button onClick={handlegithubSignIn} className="btn btn-lg w-100 mt-2 mb-2 buttonText" style={{ color: 'white', backgroundColor: '#AD5C51' }}><FontAwesomeIcon className="iconSize" icon={faGithub} /> Github Sign In</button><br />
          </div>
        </div>
      }
    </div>
  );
};

export default Login;












