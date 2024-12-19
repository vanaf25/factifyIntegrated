import instance from "./api";

export const getSettings=async ()=>{
    try {
        const response = await instance.get(`settings`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
export const setSettings=async (data)=>{
    try {
        const response = await instance.post(`settings`,data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
