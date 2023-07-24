
const SendVerifyCodeRemote = ([mobile]) =>{
    return;
}

const VerifyCode = ([code, token]) =>{
    return false;
}

const MobileLoginRemote = ([mobile,code])=>{
    const user = {
        'email':'wuzeyi1101@gmail.com', 
        'displayName':'子瑜', 
        'uid':'12322233232',
        'token':'ABDFA32DE343BBC09B'
      };
    return user;
}

export default SendVerifyCodeRemote;