import React, {useEffect, useState} from "react";
import {addToFavorite, removeFromFavorite} from "../../../api/user";
import {FaStar} from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import {removeFact} from "../../../api/facts";

const Fact = ({fact,setCurrentFact,onDeleteFact,isHistory,isFirst}) => {
    const getStatusColor = (status) => {
        switch(status) {
            case 'true':
                return 'text-accent1';
            case 'false':
                return 'text-secondary';
            case 'partially-true':
                return 'text-accent2';
            case 'misleading':
                return 'text-misleading';
            default:
                return 'text-gray-500';
        }
    };
    const [isFavorite,setIsFavorite]=useState(fact.isFavorite);
    const [isLoading,setIsLoading]=useState(false)
    const [isDeleting,setIsDeleting]=useState(false);
    const toggleFavoriteHandle=async (fact)=>{
        if (!fact.isFavorite){
            setIsLoading(true)
            await addToFavorite(fact._id)
            setIsFavorite(true)
            setIsLoading(false)
        }
        else{
            setIsLoading(true)
            await  removeFromFavorite(fact._id)
            setIsFavorite(false)
            setIsLoading(false)
        }
    }
    const removeFactHandle=async (factId)=>{
        setIsDeleting(true)
        console.log('factId:',factId);
       const res=await removeFact(factId);
       if (res.message==="Fact successfully deleted"){
           onDeleteFact(factId);
       }
               setIsDeleting(false);
    }
    return (
        <div
            className={`${isFirst ? "border-2 border-solid border-primary shadow-lg ":"shadow-md"}  bg-cardBg p-6  rounded-lg  hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between`}
        >
            <div className={"cursor-pointer"}
                 onClick={setCurrentFact ? () => setCurrentFact(fact) : undefined}
            >
                <h3 className="text-lg font-bold text-primary mb-2">{fact.title}</h3>
                <span className={`font-bold uppercase text-sm ${String(getStatusColor(fact.truthStatus))}`}>
                {String(fact.truthStatus).replace('-', ' ')}
              </span>
            </div>
            <div className="flex justify-between mt-4">
                <button disabled={isLoading} onClick={() => toggleFavoriteHandle(fact)}
                        className={`${isFavorite ? "text-primary" : "text-upgrade"}
                          hover:text-primary transition-colors duration-300`}>
                    <FaStar/>
                </button>
                <div className={"flex"}>
                    {isHistory ?  <button
                        disabled={isDeleting}
                        onClick={() => removeFactHandle(fact._id)}
                        className={`px-4 py-2 text-gray-700 rounded-lg transition-all duration-300
    hover:bg-gray-100  font-semibold text-sm flex items-center justify-center
    ${isDeleting ? 'cursor-not-allowed' : ''}`}>
                        <FaRegTrashAlt/>
                    </button>:""}
                </div>

            </div>
        </div>
    );
};

export default Fact;