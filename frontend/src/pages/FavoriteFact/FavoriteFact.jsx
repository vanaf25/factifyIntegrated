import React, {useEffect, useState} from 'react';
import Facts from "../../components/Facts/Facts";
import {getFavoriteFacts} from "../../api/user";
import CurrentFact from "../../components/CurrentFact/CurrentFact";
import FactSceleton from "../../components/global/FactSceleton/FactSceleton"; // Using react-icons for better integration

const FavoriteFact = () => {
    const [facts,setFacts]=useState([])
    const [isLoading,setIsLoading]=useState(true);
    useEffect(() => {
        const func=async ()=>{
            setIsLoading(true)
            const res=await getFavoriteFacts()
            if (res){
                console.log('res:',res);
                setFacts(res)
            }
            setIsLoading(false)
        }
        func()
    }, []);
    const [currentFact,setCurrentFact]=useState();
    return (
        <div className="flex-1  overflow-y-auto  bg-bg">
            <h2 className="text-2xl text-primary mb-6">Favorite Facts</h2>
            <CurrentFact data={currentFact}/>
            {isLoading ? <FactSceleton/>:facts.length ?  <Facts setCurrentFact={(fact)=>setCurrentFact(fact)} facts={facts}/>:"No favorite facts"}
        </div>
    );
};

export default FavoriteFact;
