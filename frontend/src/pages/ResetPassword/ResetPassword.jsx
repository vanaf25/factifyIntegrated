import React, {useState} from 'react';
import Form from "../../components/Form/Form";
import {useParams} from "react-router-dom";
import {resetPassword} from "../../api/user";
import useAlert from "../../hooks/useAlert";
import Alert from "../../components/global/SuccessfulAlert/SuccesfullAlert";

const ResetPassword = () => {
    const {token}=useParams();
    const { show, mainText, text,type, triggerAlert, onClose } = useAlert();
    const fields=[ {
        name: "password",
        label: "Password",
        placeholder: "Create a password",
        type: "password",
        validation: { required: "Password is required" },
    }]
    const [isLoading,setIsLoading]=useState(false)
    const onSubmit=async (data)=>{
        setIsLoading(true)
        const res=await resetPassword({token,newPassword:data.password})
        if (res.message==="Password reset successful")  triggerAlert("Password reset successful","");
        else triggerAlert(res.message,"","danger");
        setIsLoading(false)
    }
    return (
        <div>
            <Alert show={show} type={type}  mainText={mainText} text={text} onClose={onClose} />
            <Form isLoading={isLoading} submitButtonText={"Reset password"}
                  onSubmit={onSubmit}   title={"Reset Password"} fields={fields} />
        </div>
    );
};

export default ResetPassword;