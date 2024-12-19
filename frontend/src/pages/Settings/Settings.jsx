import React, { useState } from 'react';
import {changePassword} from "../../api/user";
import Form from "../../components/Form/Form";
import {useUser} from "../../context/UserContext";
import {applyCouponCode} from "../../api/couponCode";
import Alert from "../../components/global/SuccessfulAlert/SuccesfullAlert";
import useAlert from "../../hooks/useAlert";

const UserForm = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupError,setPopupError]=useState("")
    const [serverError,setServerError]=useState("")
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [isCodeSubmitting,setIsCodeSubmitting]=useState(false)
    const onSubmit =async (data) => {
        console.log('Main Form Data:', data);
        setIsSubmitting(true)
        const res= await changePassword({newPassword:data.newPassword,currentPassword:data.currentPassword})
        if (res.code==="ERR_BAD_REQUEST"){
            setServerError(res.response.data.message)
        }
        else{
            triggerAlert('Password changed successfully', ``);
            setServerError("");
        }
        setIsSubmitting(false);
    };
        const {user,setUser}=useUser()
    const { show, mainText, text, triggerAlert, onClose } = useAlert();
    const onSubmitPopup =async (data) => {
        setIsCodeSubmitting(true)
        const res=await applyCouponCode(data.code);
        console.log('res:',res);
        if(res.creditsAdded){
            triggerAlert('The coupon applied successfully', `You have got a ${res.creditsAdded} credits! `);
            setUser(prevState=>({...prevState,credits:res.creditsAdded+prevState.credits}))
            setPopupError("")
            setIsPopupOpen(false);
        }
        else{
            if (res.code==="ERR_BAD_REQUEST"){
                setPopupError(res.response.data.message)
            }
        }
        setIsCodeSubmitting(false)
    };
    const handleOverlayClick = () => {
        setIsPopupOpen(false);
    };
    const handlePopupClick = (event) => {
        event.stopPropagation();
    };
    const fields = [
        {
            name: 'userName',
            label: 'Username',
            disabled: true,
            type: 'text',
        },
        {
            name: 'email',
            label: 'Email',
            disabled: true,
            type: 'email',
        },
        {
            name: 'currentPassword',
            label: 'Current Password',
            type: 'password',
            validation: { required: 'Current password is required' },
        },
        {
            name: 'newPassword',
            label: 'New Password',
            type: 'password',
            validation: { required: 'New password is required' },
        },
    ];
    const popupFields=[{
        name: 'code',
        label: 'Provide code',
        type: 'text',
    }]
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Form */}
            <Alert show={show} mainText={mainText} text={text} onClose={onClose} />
            <div className="flex flex-wrap justify-between">
                <h2 className="text-[#6C63FF]">Settings</h2>
                <div>
                    <button
                        type="button"
                        onClick={() => setIsPopupOpen(true)}
                        className="p-2 bg-[#D95D30] text-white rounded hover:bg-[#e0633a] transition-colors ml-4"
                    >
                        Add coupon code
                    </button>
                </div>
            </div>
            <div className="flex w-full justify-center">
                <Form defaultValues={{
                    userName:user.name,
                    email:user.email
                }} globalError={serverError}  isLoading={isSubmitting}
                      resetForm fields={fields} title={"Settings"} onSubmit={onSubmit}/>
            </div>
            {isPopupOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-400"
                        onClick={handleOverlayClick} // Close popup on clicking overlay
                        aria-labelledby="popup-title"
                        role="dialog"
                        aria-modal="true"
                    ></div>

                    {/* Modal Content */}
                    <div
                        className="fixed inset-0 flex justify-center items-center z-5000"
                        onClick={handleOverlayClick} // Close popup on clicking overlay
                    >
                        <div
                            className="bg-[#2C3E50] p-8 rounded-lg w-[400px] relative"
                            onClick={handlePopupClick} // Prevent closing on clicking inside the popup
                        >
                            <Form isLoading={isCodeSubmitting} resetForm  globalError={popupError}
                                   fields={popupFields} title={"Coupon Code"} onSubmit={onSubmitPopup}/>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserForm;
