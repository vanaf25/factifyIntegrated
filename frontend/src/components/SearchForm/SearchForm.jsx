import React from 'react';
import {useForm} from "react-hook-form";

const SearchForm = ({onSubmitHandle}) => {
    const { register
        , handleSubmit } = useForm()
    return (
        <form onSubmit={handleSubmit(onSubmitHandle)}>
            <div className="search-bar">
                <input {...register("fact")}  type="text" placeholder="Enter your query..."/>
                <button type={"submit"}>Check Facts</button>
            </div>
        </form>
    );
};

export default SearchForm;