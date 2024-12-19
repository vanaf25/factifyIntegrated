import React, {useEffect, useState} from 'react';
import ReusableForm from "../../../components/Form/Form";
import {generateCouponCode, getCouponsCode} from "../../../api/couponCode";
import FactSceleton from "../../../components/global/FactSceleton/FactSceleton";
const CouponList = ({ coupons }) => {
    // Function to copy the code to clipboard
    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className="container mx-auto py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {coupons.map((coupon) => (
                    <div
                        key={coupon.code}
                        className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                        <div className="text-xl font-bold text-primary mb-2">
                            Code: {coupon.code}
                        </div>
                        <div className="text-gray-700 text-base">
                            Credit Value: {coupon.creditValue}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => handleCopy(coupon.code)}
                                className="bg-primary text-white py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-300"
                            >
                                Copy Code
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};const GenerateCodesForm = () => {
    const formFields = [
        {
            label: 'How many credits will each code have?',
            name: 'creditValue',
            type: 'number',
            placeholder: 'e.g., 10',
            validation: {
                required: 'Credits per code is required',
                min: { value: 1, message: 'At least 1 credit per code' },
                max: { value: 100, message: 'Cannot exceed 100 credits per code' },
            },
        },
        {
            label: 'How many codes do you want to generate?',
            name: 'couponAmount',
            type: 'number',
            placeholder: 'e.g., 100',
            validation: {
                required: 'Number of codes is required',
                min: { value: 1, message: 'At least 1 code must be generated' },
                max: { value: 1000, message: 'Cannot generate more than 1000 codes' },
            },
        },
    ];
        const [rowData,setRowData]=useState([])
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [isLoading,setIsLoading]=useState(false)
        const handleFormSubmit = async (data) => {
        setIsSubmitting(true)
        const res=await generateCouponCode({creditValue:Number(data.creditValue),
            couponAmount:+data.couponAmount})
        setIsSubmitting(false)
        setRowData(prevState =>([...prevState,...res]) )
    };
    useEffect(() => {
        const func=async ()=>{
            setIsLoading(true)
           const res=await getCouponsCode()
            if(Array.isArray(res)){
                setRowData(res);
            }
            setIsLoading(false)
        }
        func()
    }, []);
    return (
        <>
            <ReusableForm
                isLoading={isSubmitting}
                resetForm
                title="Generate Coupon Code"
                fields={formFields}
                onSubmit={handleFormSubmit}
                submitButtonText="Generate"
            />
            {isLoading ? <FactSceleton/>:rowData.length ? <CouponList coupons={rowData}/>:""}
        </>

    );
};

export default GenerateCodesForm;
