import React, {useEffect, useState} from 'react';
import Form from "../../../components/Form/Form";
import {useUser} from "../../../context/UserContext";
import {getSettings,setSettings as setSettingsRequest} from "../../../api/settings";
import Loader from "../../../components/global/Loader/Loader";

const Settings = () => {
    const formFields = [
        {
            name: "email",
            label: "Email Address",
            disabled:true,
            placeholder: "Enter your email",
            type: "email",
            validation: { required: "Email Address is required" },
        },
        {
            name: "apiKey",
            label: "Perplexity API Key",
            placeholder: "Enter Perplexity API Key",
            type: "text",
            validation: { required: "Perplexity API Key is required" },
        },
        {
            name: "prompt",
            label: "Main Prompt for Perplexity API",
            placeholder: "Enter Prompt",
            type: "textarea",
            validation: { required: "Main Prompt is required" },
        },
    ];
    const [isSettingsLoading,setIsSettingLoading]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const onSubmit=async (data)=>{
        console.log('dashBoard settings:',data)
        setIsSubmitting(true)
      await  setSettingsRequest({apiKey:data.apiKey,prompt:data.prompt})
        setIsSubmitting(false);
    }
    const {user}=useUser();
    const [settings,setSettings]=useState(false);
    useEffect(() => {
        const func=async ()=>{
            setIsSettingLoading(true)
           const res= await getSettings()
            if (res?.apiKey && res?.prompt){
                setIsSettingLoading(false)
                setSettings(res);
            }
            setIsSettingLoading(false)
            console.log('r:',res);
        }
        func()
    }, []);
    return (
        <div className={"w-full"}>
            {isSettingsLoading ? <Loader/>:   <Form
                    customWidth={700}
                isLoading={isSubmitting} onSubmit={onSubmit}
                  fields={formFields} defaultValues={{email:user?.email,...settings}} submitButtonText={"update"}  title={"Settings"}/> }
        </div>

         );
};

export default Settings;