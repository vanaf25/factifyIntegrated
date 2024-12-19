import React, {useMemo, useState} from 'react';
import Form from "../../components/Form/Form";
import {requestResetPassword} from "../../api/user";
import useAlert from "../../hooks/useAlert";
import Alert from "../../components/global/SuccessfulAlert/SuccesfullAlert";

const ForgotPassword = () => {
    const { show, mainText, text,type, triggerAlert, onClose } = useAlert();
    const [isLoading,setIsLoading]=useState(false)
    const onSubmit=async (data)=>{
        setIsLoading(true)
        const res=await requestResetPassword(data)
        if (res.message==="Password reset link sent to email"){
            triggerAlert("Password reset link sent to email","");
        }
        else triggerAlert(res.message,"","danger")
        setIsLoading(false);
    }
    const fields=useMemo(()=>([
        {
            name: "email",
            label: "Email",
            placeholder: "Enter your email",
            type: "email",
            validation: { required: "Email is required" },
        },
    ]),[]);
    return (
        <>
            <Alert show={show} mainText={mainText} type={type} text={text} onClose={onClose} />
            <Form isLoading={isLoading} title={"Request link"}   submitButtonText={"Request reset link"} fields={fields}
                  onSubmit={onSubmit}/>
        </>

    );
};

export default ForgotPassword;