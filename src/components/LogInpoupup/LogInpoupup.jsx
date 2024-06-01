import React, { useState } from 'react';
import "./LogInpoupup.css";
import { assets } from '../../assets/assets/assets';
// import { assets } from './../../assets/assets/assets';



const LogInpoupup = ({setShowLogIn}) => {

    const [currState,setCurrState]=useState("SignUp")
    return (
        <div className='login-popup'>
            <form className="login-popuo-container">
                <div className="login-popuo-title">
                    <h2>{currState}</h2><br/>

                    <img onClick={()=>setShowLogIn(false)} src={assets.cross_icon} alt="" />
              
                </div>
                <div className="login-popup-inpputs">
                    {currState==="LogIn"?<></>:  <input type='text' placeholder='Enter Your Name ' required/>}
                        <br/><br/>              
                    <input type='email' placeholder='Enter Your Email ' required/><br/><br/>
                    <input type='password' placeholder='Enter Your Password ' required/>
                </div>
                <button>{currState==="Sign Up" ? "Create account":"LogIn"}</button>
            
           <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing,I agree to the terms of use & privacy policy.</p>
           </div>
            {currState==="LogIn"
            ?  <p>Create A New Account? <span onClick={()=>setCurrState("SignUp")}>Click here</span></p>
            :
            <p>Already have an account?<span onClick={()=>setCurrState("LogIn")}>LogIn here</span></p>
            }
           </form>
        </div>
    );
}

export default LogInpoupup;
