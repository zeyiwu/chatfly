
import axios from "axios";
export const BackendBaseURL = "http://cdog.xyz:8079/";

export const SendVerifyCodeRemote = ({mobile}) =>{
    console.log("sendVerifyCode " + ", mobile = "+mobile);
    return axios.post(BackendBaseURL+"sendVerifyCode/", {'mobile':mobile})
    .then((response) => {
        if(response.status ===200 || response.status===201){
            return "ok";
        }
        console.log("response="+JSON.stringify(response));
        return response.data;
    }).catch((err)=>{
        console.log("err.response="+JSON.stringify(err.response));
        console.log(err);
        return err;
    });
}

export const VerifyCode = ([code, token]) =>{
    return false;
}


export const CreateUserWithMobileAndPassword=({mobile, code, password})=>{
         return axios.post(BackendBaseURL+"signup/", {'mobile':mobile, 'code':code, 'password':password})
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

export const LoginRemote=({accountId, code, password})=>{
        console.log("loginremote: account:" + accountId + " code:" + code + "  password:" + password)
        return axios.post(BackendBaseURL+"sign/", {'mobile': accountId, 'code':code, 'password':password})
            .then((response) => {
                if (response.status === 200 || response.status ===201){
                    return response.data.user;
                }
                return null;
            }).catch((err)=>{
                console.log(err);
                console.log("err message ="+err.message);
                return null;
            });
}

// export default {SendVerifyCodeRemote,MobileLoginRemote};
// export {
//     SendVerifyCodeRemote,
//     VerifyCode,
//     MobileLoginRemote
// }
