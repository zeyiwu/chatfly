
import {useState } from "react";


export const SendVerifyCodeRemote = ([mobile]) =>{return;}
export const BackendBaseURL = "http://localhost:5000/";

export const VerifyCode = ([code, token]) =>{
    return false;
}


export const CreateUserWithMobileAndPassword=({email, mobile, code, password})=>{
         return axios.post(BackendBaseURL+"signup/", {'mobile':mobile, 'code':code, 'email':email, 'password':password})
         .then((response) => {
             if(response.status ===200 || response.status===201){
                 return response.data.user;
             }
             console.log("response="+JSON.stringify(response));
             return null;
         }).catch((err)=>{
             console.log("err.response="+JSON.stringify(err.response));
             console.log(err);
             return null;
         });
    }

export const LoginRemote=([account,code, password])=>{
    const [err, setErr] = useState(false);
    try{
        const response =  fetch(BackendBaseURL+"sign/", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({'account':account, 'code':String(code), 'password':password}),
        });
        const data =  response.json();
        if (response.status === 200){
            setErr(false);
            return data.user;
        }
        setErr(true);
        return null;
    
    // const user = {
    //     'email':'wuzeyi1101@gmail.com', 
    //     'displayName':'子瑜', 
    //     'uid':'12322233232',
    //     'token':'ABDFA32DE343BBC09B'
    //   };
    // return user;

    } catch (err) {
      setErr(err);
      console.log(err);
    }


}

// export default {SendVerifyCodeRemote,MobileLoginRemote};
// export {
//     SendVerifyCodeRemote,
//     VerifyCode,
//     MobileLoginRemote
// }
