import instance from "./api";

export const getHistory=async ()=>{
    try {
        const response = await instance.get('user/history',{
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
export const getFavoriteFacts=async ()=>{
    try {
        const response = await instance.get('user/favoriteFacts',{
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
export const getUserDetails=async ()=>{
    try {
        const response = await instance.get('user',{
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
export const addToFavorite=async (factId)=>{
    try {
        const response = await instance.post(`user/favoriteFacts/${factId}`,{
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
export const changePassword=async (dto)=>{
    try {
        const response = await instance.patch(`user/password`,dto,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data
    } catch (error) {
        console.log('Error fetching data from instance:', error);
        return error
    }
}
export const removeFromFavorite=async (factId)=>{
    try {
        const response = await instance.delete(`user/favoriteFacts/${factId}`,{
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
export const getAllUsers=async ()=>{
    try {
        const response = await instance.get('user/all',{
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
export const requestResetPassword=async (data)=>{
    try {
        const response = await instance.post('user/request-reset-password',data);
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error.response.data
    }
}
export const resetPassword=async (data)=>{
    try {
        const response = await instance.post('user/reset-password',data);
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error.response.data
    }
}