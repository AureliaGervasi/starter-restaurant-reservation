import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import DisplayReservation from "../reservations/DisplayReservation";

export default function Search() {
    const [mobileNumber, setMobileNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const history = useHistory();

    function handleChange({ target }) {
        setMobileNumber(target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        setError(null);

        listReservations({ mobile_number: mobileNumber }, abortController.signal)
        .then(setReservations)
        .catch(setError);

        return () => abortController.abort();
    }

    const searchResultsJSX = () => {
        return reservations.map((reservation) => (
        <DisplayReservation
            key={reservation.reservation_id}
            reservation={reservation}
        />
        ))
    };

    return (
        <div className='row justify-content-center'>
            <h1 className='text-center py-4'>Search Reservations</h1>

            <form className='col-lg-10'>
                <ErrorAlert error={error} />
                <div className='form-group'>
                    <input
                        className='form-control'
                        name="mobile_number"
                        id="mobile_number"
                        type="tel"
                        placeholder="Enter a customer's phone number"
                        onChange={handleChange}
                        value={FormData.mobile_number}
                        required
                    />
                    <button
                        className="btn btn-xs btn-dark btn-outline-light mt-4 w-10"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Find
                    </button>
                    <button
                        className="btn btn-xs btn-cancel text-dark btn-outline-light mt-4 mx-2 w-10"
                        type="button"
                        onClick={history.goBack}
                    >
                                Cancel
                    </button>
                </div>
            
                <div>{searchResultsJSX()}</div>
                <div className="text-center">
                    {reservations.length === 0 && (
                    <h5 className='text-white mt-3'>No reservations found</h5>
                    )}
                </div>
            </form>
        </div>
    );
}