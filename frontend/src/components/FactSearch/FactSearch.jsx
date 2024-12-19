import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import './FactSearch.css'
import {getFact} from "../../api/facts";
import History from "../../pages/History/History";
import {getHistory} from "../../api/user";
import LoaderComponent from "../global/Loader/Loader";
import CurrentFact from "../CurrentFact/CurrentFact";
import LoaderSceleton from "../global/LoaderSceleton/LoaderSceleton";
import {useUser} from "../../context/UserContext";
import FactSceleton from "../global/FactSceleton/FactSceleton";
import CheckFactLoader from "../global/CheckFactLoader/CheckFactLoader";
import useAlert from "../../hooks/useAlert";
import Alert from "../global/SuccessfulAlert/SuccesfullAlert";
const FactSearch = () => {
    const { register, handleSubmit,reset } = useForm()
    const [data,setData]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [histories,setHistories]=useState([])
    const [progress,setProgress]=useState(0)
    const [isFactCheckError,setIsFactCheckError]=useState(false);
    const { show, mainText, text, triggerAlert, onClose } = useAlert();
    const [isHistoryLoading,setIsHistoryLoading]=useState(false);
    useEffect(() => {
        if (progress > 0 && progress < 100) {
            const interval = setInterval(() => {
                setProgress(prev => prev + 1);
            }, 100);
            return () => clearInterval(interval);
        } else if (progress === 100) {
            if (isFactCheckError) triggerAlert("Something went wrong!","some error occurred, try again")
            else reset();
            setIsLoading(false);
            setProgress(0)

        }
    }, [progress]);
    const onSubmitHandle=async (data)=>{
        setIsLoading(true)
        setData(null);
        setIsFactCheckError(false);
        setProgress(0);
        setTimeout(() => {
            setProgress(1); // Start progress after a delay
        }, 100);
        const resData=await getFact(data.fact)
        if(resData._id){
            setData(resData);
            setUser(prevState=>({...prevState,credits:prevState.credits-1}))
            setHistories(prevState =>{
                const withoutLastElem=prevState.length===15 ?
                    prevState.slice(0,prevState.length-1):prevState
                return [resData,...withoutLastElem]
            });
        }
        else{
            setIsFactCheckError(true);
        }
    }
    useEffect(() => {
        const func=async ()=>{
            setIsHistoryLoading(true)
            const facts=await getHistory();
            setHistories(facts)
            setIsHistoryLoading(false);
        }
        func();
    }, []);
    const { user,setUser } = useUser();
    const onDeleteFact=(factId)=>setHistories(prevState =>prevState.filter(el=>el._id!==factId));
    return (
        <div>
            <Alert show={show} type={"danger"} mainText={mainText} text={text} onClose={onClose} />
            <div className="bg-[var(--card-bg)] p-8 rounded-[20px] shadow-lg mb-8">
                <h2>Hi {user.name}!</h2>
                <form className={"w-full"} onSubmit={handleSubmit(onSubmitHandle)}>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 w-full max-w-lg mx-auto">
                        <input
                            type="text"
                            disabled={isLoading}
                            {...register("fact",{
                                required: "This field is required",
                                validate: value => value.trim() !== "" || "Input cannot consist only of spaces"
                            })}
                            placeholder="Enter something..."
                            className="sm:col-span-4 p-2 disabled:cursor-not-allowed disabled-opacity-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            disabled={isLoading || user.credits===0}
                            className={`${isLoading ? 'cursor-not-allowed hover:bg-secondary  opacity-50' : 'hover:bg-primary-dark'} col-span-1 bg-secondary text-white py-2 px-4 rounded-md transition duration-300`}>
                            {isLoading ? "checking...":"Check"}
                        </button>
                    </div>
                </form>
                {isLoading ? <CheckFactLoader progress={progress}/>:""}
            </div>
            {isLoading ? <LoaderSceleton/> : ""}
            {!isLoading ? <CurrentFact data={data}/>:""}
            {isHistoryLoading ? <FactSceleton/> :
                <History
                    onDeleteFact={onDeleteFact}
                    histories={histories} setCurrentFact={(fact) => setData(fact)}/>}
        </div>
    );
};

export default FactSearch;