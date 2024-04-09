import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

export default function NewTable({ loadDashboard }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        table_name: "",
        capacity: "",
    });

    function handleChange({ target }) {
        setFormData({
        ...formData,
        [target.name]:
            target.name === "capacity" ? Number(target.value) : target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();

        if (validateFields()) {
        createTable(formData, abortController.signal)
            .then(loadDashboard)
            .then(() => history.push(`/dashboard`));
            // .catch(setError);
        }

        return () => abortController.abort();
    }

    function validateFields() {
        let foundError = null;

        if (formData.table_name === "" || formData.capacity === "") {
        foundError = {
            message:
            "invalid form: table name & capacity must be provided to create table",
        };
        } else if (formData.table_name.length < 2) {
        foundError = {
            message:
            "invalid table name: table name must contain at least two characters",
        };
        }

    return foundError === null;
    }

    return (
        <div className='row justify-content-center'>
            <form className='col-lg-10' onSubmit={handleSubmit}>
                <h1 className='text-center py-4'>New Table</h1>
                <div className='form-group'>
                    <label htmlFor="table_name">Table Name</label>
                    <input
                        name="table_name"
                        id="table_name"
                        className="form-control"
                        type="text"
                        minLength="2"
                        onChange={handleChange}
                        value={formData.table_name}
                        placeholder="Enter table name"
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="capacity">Table Capacity</label>
                    <input
                        name="capacity"
                        id="capacity"
                        placeholder='Enter seating capacity'
                        className="form-control"
                        type="number"
                        // min="1"
                        onChange={handleChange}
                        value={formData.capacity}
                        required
                    />
                </div>

                <div className='form-group'>
                    <button
                        className="btn btn-xs btn-dark btn-outline-light w-10"
                        type="submit"
                    >
                        Submit
                    </button>

                    <button
                        className="btn btn-xs btn-cancel text-dark btn-outline-light mx-2 w-10"
                        type="button"
                        onClick={history.goBack}
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
}