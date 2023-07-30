import axios from 'axios'
export const SendVerifyCodeRemote = ([mobile]) =>{return;}
export const BackendBaseURL = "http://localhost:5000/";

export const VerifyCode = ([code, token]) =>{
    return false;
}


export const MobileLoginRemote=({mobile,code})=>{
    return axios.post(BackendBaseURL+"sign/", {'mobile':mobile, 'code':code})
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
    // const user = {
    //     'email':'wuzeyi1101@gmail.com', 
    //     'displayName':'子瑜', 
    //     'uid':'12322233232',
    //     'token':'ABDFA32DE343BBC09B'
    //   };
    // return user;

  


}

// export default {SendVerifyCodeRemote,MobileLoginRemote};
// export {
//     SendVerifyCodeRemote,
//     VerifyCode,
//     MobileLoginRemote
// }
