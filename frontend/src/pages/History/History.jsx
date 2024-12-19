import React from 'react';
import Facts from "../../components/Facts/Facts";
const History = ({setCurrentFact,histories,onDeleteFact}) => {
    return (
            <>
                    <h3>Recent History</h3>
                {histories.length ? <Facts
                    isHistory
                    onDeleteFact={onDeleteFact}
                    setCurrentFact={setCurrentFact} facts={histories}/>:"No history yet"}
            </>
    );
};

export default History;