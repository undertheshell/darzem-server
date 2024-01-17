import React, { useState } from "react";

export const AddAuthorForm = (props) => {
    const [authorName, setAuthorName] = useState("");
    const [authorYearsOfLife, setAuthorYearsOfLife] = useState("");

    return (
        <form onSubmit={ (e) => { e.preventDefault(); props.onAddAttribute(authorName, authorYearsOfLife) } } className="d-flex flex-column align-items-center justify-content-between" style={{ height: "20rem" }}>
            <span><b>Добавление автора</b></span>
            <div className="form-group">
                <span>Имя</span>
                <input type={'text'}
                    className="border-1 form-control"
                    style={{backgroundColor: "#f5f5f5"}}
                    placeholder={'имя'}
                    value={authorName}
                    required
                    onChange={ (e) => { setAuthorName(e.target.value) } }/>
            </div>

            <div className="form-group">
                <span>Годы жизни</span>
                <input type={'text'}
                    className="border-1 form-control"
                    style={{backgroundColor: "#f5f5f5"}}
                    placeholder={'годы'}
                    value={authorYearsOfLife}
                    required
                    onChange={ (e) => { setAuthorYearsOfLife(e.target.value) } }/>
            </div>

            <button className="align-self-end btn btn-primary mx-auto ">Добавить автора</button>
        </form>
    );
} 