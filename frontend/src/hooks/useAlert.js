// useAlert.js
import { useState } from 'react';

const useAlert = () => {
    const [show, setShow] = useState(false);
    const [mainText, setMainText] = useState('');
    const [text, setText] = useState('');
    const [type,setType]=useState("")
    const triggerAlert = (mainText, text,type) => {
        setMainText(mainText);
        setText(text);
        setShow(true);
        setType(type)
    };

    const onClose = () => {
        setShow(false);
    };

    return {
        show,
        mainText,
        text,
        type,
        triggerAlert,
        onClose,
    };
};

export default useAlert;
