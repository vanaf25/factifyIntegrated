import instance from "./api";

export const register=async (body)=>{
    try {
        const response = await instance.post('auth/register',body);
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
export const login=async (body)=>{
    try {
        const response = await instance.post('auth/login',body);
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
export const verifyJwt=async (body)=>{
    try {
        const response = await instance.post('auth/user',body);
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}