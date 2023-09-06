import React, {useContext, useEffect, useState} from 'react';
import { Button, Form, Input,message,Row } from 'antd';
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import "./signupform.css";
import {CreateUserWithMobileAndPassword, SendVerifyCodeRemote} from "../remote/Api";


const SignUp = () => {

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [count,setCount] = useState(60);
    const [disable,setDisable] = useState(false);

    const [form] = Form.useForm();

    const timeClick = async() => {
        const {username} = form.getFieldsValue();
        if(!username){
            try{
                await form.validateFields();

            }catch (e) {

            }
            return
        }
        let times = count;
        let timer = setInterval(function () {
            if (times < 1) {
                setDisable(false);
                setCount(60);
                clearInterval(timer);
            } else {
                times -= 1;
                setCount(times);
                setDisable(true);
            }
        }, 1000);

        try{
            let result = await SendVerifyCodeRemote({mobile:username});
            console.log("send verify code: " + result);
        }catch(error){
            console.log(error);
        }
    };


    const onFinish = async(values) => {
        try {
            const {password,username} = values;
            let userCredential = await CreateUserWithMobileAndPassword({mobile:username, code:'+86', password});
            console.log("register:"+JSON.stringify(userCredential));

            dispatch({ type: "SIGNUP", payload: userCredential});

            // once user is signed in navigate them to the home page
            navigate("/");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            name="signUp"
            form={form}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                wrapperCol={{
                }}
                label=""
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入您的手机号',
                    },
                ]}
            >
                <Input placeholder="手机号"  style={{width:"100%"}} size={"large"} prefix={<span className="ant-input-prefix"><span role="img" aria-label="robot"
                                                                                              className="anticon anticon-robot"><svg
                    viewBox="64 64 896 896" focusable="false" data-icon="robot" width="1em" height="1em" fill="currentColor"
                    aria-hidden="true"><path
                    d="M300 328a60 60 0 10120 0 60 60 0 10-120 0zM852 64H172c-17.7 0-32 14.3-32 32v660c0 17.7 14.3 32 32 32h680c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-32 660H204V128h616v596zM604 328a60 60 0 10120 0 60 60 0 10-120 0zm250.2 556H169.8c-16.5 0-29.8 14.3-29.8 32v36c0 4.4 3.3 8 7.4 8h729.1c4.1 0 7.4-3.6 7.4-8v-36c.1-17.7-13.2-32-29.7-32zM664 508H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg></span></span>}/>
            </Form.Item>

            <Form.Item
                label=""
                name="code"
                rules={[
                    {
                        required: true,
                        message: '请输入您的验证码',
                    },
                ]}
                wrapperCol={{
                }}
            >
                <div style={{display:"flex"}}>
                    <Input placeholder="验证码" className={"codeInput"} size={"large"} prefix={<span role="img" aria-label="lock" className="anticon anticon-lock prefixIcon"><svg
                        viewBox="64 64 896 896" focusable="false" data-icon="lock" width="1em" height="1em" fill="currentColor"
                        aria-hidden="true"><path
                        d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"></path></svg></span>}/>
                    {
                        disable ? <Button
                            style={{marginLeft:"3%"}}
                            type="dashed"
                            size={"large"}
                            disabled={disable}
                        >
                            {`${count}s后获取`}
                        </Button> : <Button
                            style={{marginLeft:"3%"}}
                            type="dashed"
                            size={"large"}
                            onClick={()=>{
                                timeClick()
                            }}
                        >
                            获取验证码
                        </Button>
                    }


                </div>

            </Form.Item>


            <Form.Item
                label=""
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码',
                    },
                ]}
                wrapperCol={{
                }}
            >
                <Input.Password placeholder="密码" style={{width:"100%"}} size={"large"} prefix={<span role="img" aria-label="lock"
                                                                    className="anticon anticon-lock prefixIcon"><svg
                    viewBox="64 64 896 896" focusable="false" data-icon="lock" width="1em" height="1em" fill="currentColor"
                    aria-hidden="true"><path
                    d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"></path></svg></span>}/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                }}
            >
                <Button type="primary" size={"large"} htmlType="submit" style={{width:"100%"}}>
                    注册
                </Button>
            </Form.Item>
        </Form>
    );
};
export default SignUp;
