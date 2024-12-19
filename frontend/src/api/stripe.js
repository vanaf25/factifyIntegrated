import instance from "./api";

export const basicPayment=async (data)=>{
    try {
        const response = await instance.post(`stripe/create-subscription/`,data,{
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
export const cancelSubscription=async ()=>{
    try {
        const response = await instance.delete(`stripe`,{
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