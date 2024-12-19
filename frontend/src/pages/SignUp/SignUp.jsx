import React, { useState } from 'react';
import Form from "../../components/Form/Form";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const userFormFields = [
        {
            name: "username",
            label: "Username",
            placeholder: "Choose a username",
            type: "text",
            validation: { required: "Username is required" },
        },
        {
            name: "email",
            label: "Email",
            placeholder: "Enter your email",
            type: "email",
            validation: { required: "Email is required" },
        },
        {
            name: "password",
            label: "Password",
            placeholder: "Create a password",
            type: "password",
            validation: { required: "Password is required" },
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Confirm your password",
            type: "password",
        },
    ];

    const navigate = useNavigate();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        console.log('data:', data);
        setIsLoading(true);
        const res = await register({ name: data.username, password: data.password, email: data.email });

        if (res.id) {
            navigate("/signIn");
        } else if (res.code === "ERR_BAD_REQUEST") {
            setError(res.response.data.message);
        }

        setIsLoading(false);
        console.log('u:', res);
    };

    return (
        <Form
            globalError={error}
            isLoading={isLoading}
            fields={userFormFields}
            onSubmit={onSubmit}
            submitButtonText={"Sign Up"}
            additionalLinks={[{ href: "/signIn", text: "Already have an account? Login here" }]}
            title={"Sign Up for HighlightFactCheck"}
        />
    );
};

export default SignUp;
