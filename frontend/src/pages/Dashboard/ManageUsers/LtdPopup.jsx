import React, {useEffect, useState} from 'react';
import {deleteLTDCode, getLtdCodesOfUser} from "../../../api/ltdCode";
import Loader from "../../../components/global/Loader/Loader";
import {AgGridReact} from "ag-grid-react";
import { saveAs } from 'file-saver';
const LtdPopup = ({handleOverlayClick,handlePopupClick,popupData}) => {
    const [codes,setCodes]=useState([])
    const [isLoading,setIsLoading]=useState(true);
    useEffect(() => {
        const func=async ()=>{
            if (popupData._id){
                setIsLoading(true)
               const res= await getLtdCodesOfUser(popupData._id)
                setIsLoading(false);
                setCodes(res);
            }
        }
        func()
    }, [popupData]);
    const exportToCSV = () => {
        const csvData = codes.map(code => ({
            code: code._id, // Rename to match desired header
            platformName: code.platform
        }));

        const csvRows = [];
        const headers = Object.keys(csvData[0]);
        csvRows.push(headers.join(','));

        for (const row of csvData) {
            const values = headers.map(header => JSON.stringify(row[header], (key, value) => value === null ? '' : value));
            csvRows.push(values.join(','));
        }

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'ltd_codes.csv');
    };
    const deleteCodeHandle=async (codeId)=>{
        console.log('id:',codeId);
        const res=await deleteLTDCode(codeId)
        if (res.success===true){
            setCodes(prevCodes=>prevCodes.filter(c=>c._id!==codeId));
        }
    }
    const columns=[{
        field:"code",
        headerName:"code",
        flex:2.5,
    },
        {field:"platform",headerName: "Platform",flex:1.5},
        { headerName: 'Delete', flex: 1, field: 'action', cellRenderer: (params) => (
                <div>
                    <button onClick={()=>deleteCodeHandle(params.data._id)} className={"bg-secondary w-full hover:bg-red-700 text-white font-bold"}
                            >Delete
                    </button>
                </div>
            ),}
    ]
    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-400"
                onClick={handleOverlayClick} // Close popup on clicking overlay
                aria-labelledby="popup-title"
                role="dialog"
                aria-modal="true"
            ></div>

            {/* Modal Content */}
            <div
                className="fixed inset-0 flex justify-center items-center z-5000"
                onClick={handleOverlayClick} // Close popup on clicking overlay
            >
                <div
                    className="bg-white p-8 rounded-lg w-[700px] relative"
                    onClick={handlePopupClick} // Prevent closing on clicking inside the popup
                >
                    <h2>Ltd codes of {popupData.name}</h2>
                    {isLoading ? <Loader/> : <>
                        <button
                            className="bg-primary mb-2 text-white py-2 px-4 rounded hover:bg-primary-dark"
                            onClick={exportToCSV}
                        >
                            Export to CSV
                        </button>
                        <div className="ag-theme-alpine" style={{width: '100%'}}>
                            <AgGridReact
                                rowData={codes}
                                columnDefs={columns}
                                domLayout='autoHeight'
                            />
                        </div>
                    </>

                    }
                </div>
            </div>
        </>
    );
};

export default LtdPopup;