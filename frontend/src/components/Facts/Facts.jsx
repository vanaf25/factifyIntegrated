import Fact from "./Fact/Fact";
const Facts = ({facts,setCurrentFact,onDeleteFact,isHistory})=>{
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facts?.map((fact,index) => (
             <Fact isFirst={index===0} isHistory={isHistory}
                   onDeleteFact={onDeleteFact}
                   setCurrentFact={setCurrentFact} fact={fact} key={fact._id}/>
            ))}
        </div>
    )
};

export default Facts;