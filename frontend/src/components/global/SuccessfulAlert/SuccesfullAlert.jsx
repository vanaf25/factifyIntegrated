// Alert.js
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ show, mainText, text, onClose,type }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, translateY: -20 }} // Initial state
                    animate={{ opacity: 1, translateY: 0 }} // State when visible
                    exit={{ opacity: 0, translateY: -20 }} // State when exiting
                    transition={{ duration: 0.6 }} // Duration of the animation (slower)
                    className={`fixed top-5 left-1/2 transform -translate-x-1/2 ${type==="danger" ? "bg-red-100": "bg-teal-100"} border-t-4
                     ${type==="danger" ? "border-red-500":"border-teal-500" }
                      rounded-b  ${type==="danger" ? "text-red-600":"text-teal-600"} px-4 py-3 shadow-md z-50`}
                    role="alert"
                >

                        <div className="flex">
                            {type!=="danger" ? <div className="py-1">
                                <svg
                                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
                                    />
                                </svg>
                            </div>:""}
                            <div>
                                <p className="font-bold">{mainText}</p>
                                <p className="text-sm">{text}</p>
                            </div>
                        </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Alert;
