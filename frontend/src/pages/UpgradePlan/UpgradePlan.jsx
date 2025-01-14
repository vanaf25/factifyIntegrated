import React, { useState } from 'react';
import './UpgradePlan.css'
import Form from "../../components/Form/Form";
import {applyLtdCode} from "../../api/ltdCode";
import useAlert from "../../hooks/useAlert";
import Alert from "../../components/global/SuccessfulAlert/SuccesfullAlert";
import {useUser} from "../../context/UserContext";
import {Link} from "react-router-dom";
import {cancelSubscription} from "../../api/stripe";
const plans = [
    {
        name: "Starter Plan",
        link:"starter",
        price: 1,
        credits: "10 Credits",
        features: [
            "Advanced Algorithm Analysis",
            "Comprehensive Explanations (50-150 words)",
            "Multi-Source Verification",
            "Clear Ratings & Severity Assessment",
            "Continuous Learning",
            "Secure Authentication",
            "Priority Support"
        ],
        paymentLinks:{
            month:"bIYaEJbpu3VOgMMdQR",
            year:"cN27sx516eAs2VW8wC"
        }
    },
    {
        name: "Pro Plan",
        price: 8,
        credits: "100 Credits",
        link:"pro",
        features: [
            "Advanced Algorithm Analysis",
            "Comprehensive Explanations (50-150 words)",
            "Multi-Source Verification",
            "Clear Ratings & Severity Assessment",
            "Continuous Learning",
            "Secure Authentication",
            "Priority Support"
        ],
        paymentLinks:{
            month:"3csfZ3fFK0JCeEE7su",
            year:"dR63chalqcskdAAcMR"
        }
    },
    {
        name: "Business Plan",
        link:"business",
        price: 15,
        credits: "500 Credits",
        features: [
            "Advanced Algorithm Analysis",
            "Comprehensive Explanations (50-150 words)",
            "Multi-Source Verification",
            "Clear Ratings & Severity Assessment",
            "Continuous Learning",
            "Secure Authentication",
            "Priority Support"
        ],
        paymentLinks:{
            month:"3csdQV2SY7805449AD",
            year:"aEU1498dibog1RS148"
        }
    }
];
/*
const plans = [
    {
        name: "Starter Plan",
        link:"starter",
        price: 1,
        credits: "10 Credits",
        features: [
            "Advanced Algorithm Analysis",
            "Comprehensive Explanations (50-150 words)",
            "Multi-Source Verification",
            "Clear Ratings & Severity Assessment",
            "Continuous Learning",
            "Secure Authentication",
            "Priority Support"
        ],
        paymentLinks:{
            month:"test_9AQ7tPcOZcCK2NW28a",
            year:"test_bIYcO9g1b1Y63S0dQQ"
        }
    },
    {
        name: "Pro Plan",
        price: 8,
        credits: "100 Credits",
        link:"pro",
        features: [
            "Advanced Algorithm Analysis",
            "Comprehensive Explanations (50-150 words)",
            "Multi-Source Verification",
            "Clear Ratings & Severity Assessment",
            "Continuous Learning",
            "Secure Authentication",
            "Priority Support"
        ],
        paymentLinks:{
            month:"test_aEU9BX02dauC2NW7sv",
            year:"test_00gcO92al7iq4W4148"
        }
    },
    {
        name: "Business Plan",
        link:"business",
        price: 15,
        credits: "500 Credits",
        features: [
            "Advanced Algorithm Analysis",
            "Comprehensive Explanations (50-150 words)",
            "Multi-Source Verification",
            "Clear Ratings & Severity Assessment",
            "Continuous Learning",
            "Secure Authentication",
            "Priority Support"
        ],
        paymentLinks:{
            month:"test_cN215r5mxcCK3S04gl",
            year:"test_dR615reX7fOW1JS5kq"
        }
    }
];
*/
const UpgradePlan = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isApplying,setIsApplying]=useState(false)
    const [error,setError]=useState("")
    const { show, mainText, text, triggerAlert, onClose } = useAlert();
    const {setUser,user} =useUser()
    console.log('user:',user);
    const onSubmitPopup = async (data) => {
        console.log('Popup Form Data:', data);
        setIsApplying(true)
        const res= await applyLtdCode(data.code)
        if (res.message==="Code redeemed"){
            setIsPopupOpen(false);
            setError("")
            setUser({...user,credits:user.credits+50})
            triggerAlert("LTD code was successfully applied!","You will get 50 credits every month");
        }
        if (res.code){
            setError(res.response.data.message)
        }
        console.log('res:',res);
        setIsApplying(false)
    };

    // Close popup when overlay is clicked
    const handleOverlayClick = () => {
        setIsPopupOpen(false);
        setError("")
    };

    // Prevent the popup form from closing when clicked inside
    const handlePopupClick = (event) => {
        event.stopPropagation();
        setError("")
    };

    // Define the input fields configuration for the popup form
    const popupFields = [
        {
            name: 'code',
            label: 'Enter Your LTD Coupon Code',
            type: 'text',
            validation: {
                required: 'LTD is required',
            },
        },
    ];
    const [isCanceling,setIsCanceling]=useState(false)
    const cancelSubscriptionHandler=async ()=>{
        setIsCanceling(true);
      const res= await cancelSubscription()
        if(res.message==="cancelled successfully!"){
            triggerAlert("cancelled successfully!");
            if(user.subscriptionType==="month"){
                setUser({...user,subscription:"",subscriptionType:""});
            }
            else setUser({...user,subscriptionIsActive:false})
        }
        setIsCanceling(false);
    }
        const [isCheckBoxChecked,setIsCheckboxChecked]=useState(false);
    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <Alert show={show} mainText={mainText} text={text} onClose={onClose}/>
            <div className={"w-full max-w-4xl  "}>
                <div className="w-full  flex justify-between flex-wrap  items-center mb-8">
                    {user.subscription ?
                        <div>
                            <p>Your current plain is:{user.subscription} plan</p>
                            <p>Billing:{user.subscriptionType}ly</p>
                        </div> :
                        <p>You don't activated plan yet!</p>}
                    {user.subscription && <button
                        disabled={isCanceling || !user.subscriptionIsActive }
                        onClick={cancelSubscriptionHandler}
                        className="px-5 py-2
                     text-white bg-red-500 disabled:hover:bg-red-500 hover:bg-red-600  rounded-md
                      focus:outline-none focus:ring-2 focus:ring-red-400">
                        {isCanceling ? "Cancelilng..." : "cancel"}
                    </button>}
                </div>
                <hr className="h-[2px] w-full mb-8 bg-white border-0"/>
                <div className="w-full flex-wrap  flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-semibold mb-0 text-[#FFA500]">Upgrade Your Plan</h2>
                    <div className={"flex flex-wrap  items-center"}>
                        <div className="toggle-container font-medium">
                            <span className={`toggle-label
                             text-${user.subscriptionType === "month" ? "accent-blue-600" : "gray-500"}`}>Monthly</span>
                            <label className="toggle-switch">
                                <input checked={isCheckBoxChecked}
                                       onChange={() => setIsCheckboxChecked(prevState => !prevState)}
                                       type="checkbox" id="toggleButton"/>
                                <span className="slider"></span>
                            </label>
                            <span
                                className={`toggle-label text-${user.subscriptionType === "year" ? "blue-600" : "gray-500"}`}>Yearly</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-[#FFA500] font-semibold py-1 px-2
                      text-white rounded hover:bg-[#e59400] transition-colors"
                        >
                            LTD
                        </button>
                    </div>
                </div>
            </div>


            {/* Upgrade Plans Container */}
            <div className="upgrade-container w-full max-w-4xl bg-[#2C3E50] p-6 rounded-lg">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Starter Plan */}
                    {plans.map((plan, index) => (
                        <Link
                            to={`https://buy.stripe.com/${plan.paymentLinks[isCheckBoxChecked ? "year":"month"]}?prefilled_email=${user.email}`}
                            className={user.subscription.length ? "pointer-events-none" : ""}
                            rel="noopener noreferrer"
                            target={"_blank"}
                        >
                            <div
                                key={index}
                                className={`plan border border-white rounded-lg p-6 flex flex-col ${
                                    user.subscription.length ? "bg-gray-300 border-gray-400" : ""
                                }`}
                            >
                                <h3
                                    className={`text-2xl font-semibold ${
                                        user.subscription.length ? "text-gray-500" : "text-[#FFA500]"
                                    } mb-4`}
                                >
                                    {plan.name}
                                </h3>
                                <div
                                    className={`option-price text-3xl font-bold mb-4 ${
                                        user.subscription.length ? "text-gray-500" : "text-white"
                                    }`}
                                >
                                    ${plan.price}
                                    {isCheckBoxChecked ? 0 : ""}
                                </div>
                                <ul
                                    className={`mb-6 flex-grow ${
                                        user.subscription.length ? "text-gray-500" : "text-white"
                                    }`}
                                >
                                    <li className="mb-2">{plan.credits}</li>
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="mb-2">{feature}</li>
                                    ))}
                                </ul>
                                <button
                                    disabled={user.subscription.length}
                                    className={`mt-auto py-2 rounded transition-colors ${
                                        user.subscription.length
                                            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                            : "bg-[#FFA500] text-white hover:bg-[#e59400]"
                                    }`}
                                >
                                    {user.subscription.length ? "Subscribed" : "Subscribe Now"}
                                </button>
                            </div>
                        </Link>

                    ))}

                    {/* Enterprise Plan */}
                    <div className="col-span-1 md:col-span-3 plan border border-white rounded-lg p-6 flex flex-col">
                        <h3 className="text-2xl font-semibold text-[#FFA500] mb-4">Enterprise Plan</h3>
                        <p className="text-white mb-6 flex-grow">
                            Contact us for pricing and custom features tailored to your organization.
                        </p>
                        <button
                            className="mt-auto bg-[#FFA500] text-white py-2 rounded hover:bg-[#e59400] transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-200"
                        onClick={handleOverlayClick} // Close popup on clicking overlay
                        aria-labelledby="popup-title"
                        role="dialog"
                        aria-modal="true"
                    ></div>

                    {/* Modal Content */}
                    <div
                        className="fixed inset-0 flex justify-center items-center z-500"
                        onClick={handleOverlayClick} // Close popup on clicking overlay
                    >
                        <div
                            className="bg-[#2C3E50] p-8 rounded-lg w-full max-w-sm shadow-lg relative"
                            onClick={handlePopupClick} // Prevent closing on clicking inside the popup
                        >
                            <Form isLoading={isApplying} globalError={error} fields={popupFields}
                                  title={"Apply ltd Code"} onSubmit={onSubmitPopup} submitButtonText={"Apply Code"}/>
                        </div>
                    </div>
                </>
            )}
        </main>
    );

};

export default UpgradePlan;
