import instance from "./api";

export const getFact=async (fact)=>{
    try {
        const response = await instance.post('fact',{fact},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
            onDownloadProgress:(progressEvent)=>{
                const total = progressEvent.total; // Общий размер
                const current = progressEvent.loaded;
                if (total > 0) {
                    const percentCompleted = Math.round((current / total) * 100); // Процент загрузки
                    console.log(percentCompleted); // Обновляем прогресс
                }
            }
        });
        return response.data
    } catch (error) {
        console.error('Error fetching data from instance:', error);
        return error
    }
}
export const removeFact=async (factId)=>{
    try {
        const response = await instance.delete(`fact/${factId}`,{
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