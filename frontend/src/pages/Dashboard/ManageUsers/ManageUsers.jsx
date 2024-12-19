import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './Customizing.css';
import { getAllUsers } from "../../../api/user";
import Form from "../../../components/Form/Form";
import LtdPopup from "./LtdPopup";

const ManageUsers = () => {
    const [rowData, setRows] = useState([]);
    const [popupData, setPopupData] = useState(null); // State to control popup data
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility
    const columnDefs = [
        { headerName: 'Username', flex: 1, field: 'name' },
        { headerName: 'Email', flex: 2, field: 'email' },
        { headerName: 'Credits', flex: 1, field: 'credits' },
        { headerName: 'Subscription Type', flex: 2, field: 'subscription' },
        {
            headerName: 'LTD Coupon Codes', flex: 2, field: 'ltdCouponCodes', cellRenderer: (params) => {
                return (
                    <div>
                        <button
                            disabled={params.data.ltdCodes.length === 0}
                            className={`w-full font-bold text-white 
                ${params.data.ltdCodes.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-primary hover:bg-primary-dark"}`}
                            onClick={() => handleOpenPopup(params.data)} // Open popup on click
                        >
                            Open
                        </button>
                    </div>
                );
            }
        },
        {
            headerName: 'Action', flex: 1, field: 'action', cellRenderer: (params) => (
                <div>
                    <button className={"bg-secondary w-full hover:bg-red-700 text-white font-bold"}
                            onClick={() => handleDelete(params.data.username)}>Delete
                    </button>
                </div>
            ),
        },
    ];
    useEffect(() => {
        const func = async () => {
            const res = await getAllUsers();
            if(Array.isArray(res)){
                setRows(res);
            }
        }
        func();
    }, []);
    const handleDelete = (username) => {
        console.log(`Delete user: ${username}`);
        // Implement delete action (e.g., API call, updating state)
    };
    const handleOpenPopup = (data) => {
        setPopupData(data);  // Set the selected row's data
        setIsPopupOpen(true); // Show the popup
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false); // Hide the popup
    };

    const exportToCSV = () => {
        const csvData = rowData.map(row => ({
            Username: row.name,
            Email: row.email,
            Credits: row.credits,
            'Subscription Type': row.subscription,
            'Platform Type': row.platformType,
            'LTD Coupon Codes': row.ltdCouponCodes,
        }));

        const csvRows = [];
        const headers = Object.keys(csvData[0]);
        csvRows.push(headers.join(',')); // Add header row

        for (const row of csvData) {
            const values = headers.map(header => JSON.stringify(row[header], (key, value) => value === null ? '' : value));
            csvRows.push(values.join(','));
        }

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'user_data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleOverlayClick = () => {
        setIsPopupOpen(false);
    };

    // Prevent the popup form from closing when clicked inside
    const handlePopupClick = (event) => {
        event.stopPropagation();
    };
    return (
        <div className={"main-content"}>
            <div className={"flex justify-between"}>
                <h2>Manage Users</h2>
                <div>
                    <button onClick={exportToCSV} className={"bg-primary py-4 px-8 hover:opacity-70 text-white"}>Download CSV</button>
                </div>
            </div>

            <div className="ag-theme-alpine" style={{ width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    domLayout='autoHeight'
                />
            </div>
            {isPopupOpen && <LtdPopup handleOverlayClick={handleOverlayClick} popupData={popupData} handlePopupClick={handlePopupClick} />}
        </div>
    );
};

export default ManageUsers;
