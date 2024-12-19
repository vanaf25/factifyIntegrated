import React, { useState } from 'react';
import ReusableForm from "../../../components/Form/Form";
import { generateLtdCode } from "../../../api/ltdCode";
import { saveAs } from 'file-saver'; // For CSV export

const GenerateCodesForm = () => {
    const formFields = [
        {
            label: 'Platform Name',
            name: 'platform',
            type: 'text',
            placeholder: 'e.g., Youtuber A',
            validation: {
                required: 'Platform Name is required',
                maxLength: {
                    value: 50,
                    message: 'Platform Name cannot exceed 50 characters',
                },
            },
        },
        {
            label: 'How many codes do you want to generate?',
            name: 'codesAmount',
            type: 'number',
            placeholder: 'e.g., 100',
            validation: {
                required: 'Number of codes is required',
                min: { value: 1, message: 'At least 1 code must be generated' },
                max: { value: 1000, message: 'Cannot generate more than 1000 codes' },
            },
        },
    ];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [generatedCodes, setGeneratedCodes] = useState([]);
    const [platformName, setPlatformName] = useState("");

    const handleFormSubmit = async (data) => {
        console.log('Generated Codes Data:', data);
        setIsSubmitting(true);
        setPlatformName(data.platform);
        const res = await generateLtdCode({ ...data, codesAmount: +data.codesAmount });
        setIsSubmitting(false);
        setGeneratedCodes(res); // Assuming res.codes is an array of IDs
    };

    const handleCopyToClipboard = () => {
        const codesString = generatedCodes.join(', ');
        navigator.clipboard.writeText(codesString);
        alert('Codes copied to clipboard!');
    };

    const handleExportToCSV = () => {
        const csvData = `Platform Name: ${platformName}\nGenerated Codes:\n${generatedCodes.join('\n')}`;
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, `${platformName}_codes.csv`);
    };

    return (
        <div className="container mx-auto p-4">
            <ReusableForm
                isLoading={isSubmitting}
                title="Generate LTD Code"
                fields={formFields}
                onSubmit={handleFormSubmit}
                submitButtonText="Generate"
            />

            {generatedCodes.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Generated Codes</h2>
                    <div className=" mb-4 flex gap-4">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={handleCopyToClipboard}
                        >
                            Copy All to Clipboard
                        </button>
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            onClick={handleExportToCSV}
                        >
                            Export to CSV
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {generatedCodes.map((code, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow">
                                <span className="text-gray-700 font-mono">{code}</span>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default GenerateCodesForm;
