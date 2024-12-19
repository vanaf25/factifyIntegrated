import instance from "./api";

export const applyCouponCode=async (code)=>{
    try {
        const response = await instance.get(`couponCode/${code}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
export const generateCouponCode=async (body)=>{
    try {
        const response = await instance.post(`couponCode/`,body,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
export const getCouponsCode=async (body)=>{
    try {
        const response = await instance.get(`couponCode/`,body,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}