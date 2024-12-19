import React, {useState} from 'react';
import Form from "../../components/Form/Form";
import {login} from "../../api/auth";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    let navigate = useNavigate();
    const [isLoading,setIsLoading]=useState(false)
    const signInFields = [
        {
            name: "email",
            label: "Email",
            placeholder: "Enter your email or username",
            type: "text",
            validation: { required: "Email or Username is required" },
        },
        {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            type: "password",
            validation: { required: "Password is required" },
        },
    ];
    const [loginError,setLoginError]=useState("")
    const onSubmit=async (data)=>{
        console.log('data:',data);
        try{
            setIsLoading(true)
            const res=await login(data);
            if (res.token){
                localStorage.setItem("token",res.token);
                navigate("/");
            }
            if (res.code==="ERR_BAD_REQUEST"){
                setLoginError(res.response.data.message)
            }
            setIsLoading(false)
            console.log('res:',res);
        }
        catch (e) {
            console.log('e:',e);
        }

    }
    return (
      <Form isLoading={isLoading}  globalError={loginError} submitButtonText={"Sign In"} fields={signInFields}
            additionalLinks={[{href:"/signUp",text:"Create account"},{href:"/forgot-password",text:"Forgot password"}]}
            title={"Login to HighlightFactCheck"} onSubmit={onSubmit}/>
    );
};

export default SignIn;