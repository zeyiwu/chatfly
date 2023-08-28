import React, { useContext, useState, useEffect } from "react";
import "./signupform.css";
// import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, db, goggleAuthProvider } from "../../firebase.config";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SvgComponent from "../SvgComponent";
import {SendVerifyCodeRemote, CreateUserWithMobileAndPassword} from "../remote/Api";
// import { addDoc, collection } from "firebase/firestore";

const DEFAULT_SECOND = 180;

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [showSendCode, setShowSendCode] = useState(true);
  let [seconds, setSeconds] =useState(DEFAULT_SECOND);


  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let userCredential = await CreateUserWithMobileAndPassword({mobile, code, password});
      console.log("register:"+JSON.stringify(userCredential));
      navigate("/register/");

      dispatch({ type: "SIGNUP", payload: userCredential});

      // once user is signed in navigate them to the home page
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setErrorMessage(errorMessage);
    }
  };

  const handleSendVerifyCode = async (e) => {
    e.preventDefault();
    setShowSendCode(false);
    console.log(", mobile = "+mobile);
    try{
      let result = await SendVerifyCodeRemote({mobile});
    console.log("send verify code: " + result);
    }catch(error){
      console.log(error);
      setErrorMessage(error.message);
    }
    return;
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      (seconds > 0) ? seconds = setSeconds(seconds -1) : seconds = 0;
    }, 1000);
    return ()=> clearInterval(interval);
  });

  return (
    <div className="signupFormContainer">
      <SvgComponent w={50} h={50} stroke="#202123" />
      <h1>创建账户</h1>
      <form onSubmit={handleSignup}>
        <input
          type="mobile"
          name="mobile"
          id="mobile"
          placeholder="输入手机号"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <div id="signupPassword">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="password"
          />
          {/* eye icon */}
          <i onClick={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <svg
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  stroke="#202123"
                  strokeWidth={0.792}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7Z" />
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </g>
                <title>显示密码</title>
              </svg>
            ) : (
              <svg
                width={26}
                height={26}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000"
              >
                <path
                  d="M20 14.834C21.308 13.332 22 12 22 12s-3.636-7-10-7a8.595 8.595 0 0 0-2 .236M12 9a2.995 2.995 0 0 1 3 3M3 3l18 18m-9-6a2.997 2.997 0 0 1-2.959-2.5M4.147 9c-.308.345-.585.682-.828 1C2.453 11.128 2 12 2 12s3.636 7 10 7c.341 0 .675-.02 1-.058"
                  stroke="#202123"
                  strokeWidth={0.768}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <title>隐藏密码</title>
              </svg>
            )}
          </i>
        </div>
        
        {/* <div>
        <input
          type="mobile"
          name = "mobile"
          id = "mobile"
          placeholder="mobile"
          value={mobile}
          onChange={(e)=> setMobile(e.target.value)}
          required
        />
        </div> */}

        <input
          type="code"
          name = "code"
          id = "code"
          placeholder="code"
          value={code}
          onChange={(e)=> setCode(e.target.value)}
          // required
        />
        <div>
          {
          showSendCode ? (<button type="text" onClick={handleSendVerifyCode}>发送验证码</button>) : 
          (seconds > 0 ? (<button type="text" onClick={(e)=>{
            e.preventDefault();
          }} >{seconds}s后重发</button >) : 
                            <button type="text" onClick={handleSendVerifyCode}>发送验证码</button>)
          }
        </div>
        <button type="submit">新用户注册</button>
        {errorMessage.trim() !== " " && <span>{errorMessage}</span>}
      </form>
    </div>
  );
};

export default SignupForm;
