
export const SendVerifyCodeRemote = ([mobile]) =>{return;}
export const BackendBaseURL = "http://localhost:5000/";

export const VerifyCode = ([code, token]) =>{
    return false;
}


export const MobileLoginRemote=({mobile,code})=>{
        fetch(BackendBaseURL+"sign/", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({'mobile':mobile, 'code':String(code)}),
        })
        .then((response) => {
            const data =  response.json();
            if (response.status === 200){
                return data.user;
            }
        }).catch((err)=>{
            console.log(err);
        });
 
        return null;
    
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
