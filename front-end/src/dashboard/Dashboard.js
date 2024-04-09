//import React, { useEffect, useState } from "react";
import React from "react";
//import { listReservations } from "../utils/api";
import { getDisplayDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import Buttons from "./Buttons";
import DisplayReservation from "../reservations/displayReservation";
import DisplayTable from "../tables/DisplayTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate, reservations, reservationsError, tables, tablesError, loadDashboard }) {
  // const [reservations, setReservations] = useState([]);
  // const [reservationsError, setReservationsError] = useState(null);

  // useEffect(loadDashboard, [date]);

  // function loadDashboard() {
  //   const abortController = new AbortController();
  //   setReservationsError(null);
  //   listReservations({ date }, abortController.signal)
  //     .then(setReservations)
  //     .catch(setReservationsError);
  //   return () => abortController.abort();
  // }

  const displayDate = getDisplayDate(date);

  const reservationsJSX = () => {
    return reservations.map((reservation) => (
      <DisplayReservation
        key={reservation.reservation_id}
        reservation={reservation}
        loadDashboard={loadDashboard}
      />
    ))
  };

  const tablesJSX = () => {
    return tables.map((table) => (
      <DisplayTable
        key={table.table_id}
        table={table}
        loadDashboard={loadDashboard}
      />
    ))
  };

  return (
  //   <main>
  //     <h1>Dashboard</h1>
  //     <div className="d-md-flex mb-3">
  //       <h4 className="mb-0">Reservations for date</h4>
  //     </div>
  //     <ErrorAlert error={reservationsError} />
  //     {JSON.stringify(reservations)}
  //   </main>
  // );
  <main>
      <h1 className="text-center">Dashboard</h1>

      <div className="text-center">
        <h3 className="text-center">{displayDate}</h3>
      </div>

      <div className="text-center">
          <Buttons date={date} setDate={setDate} />
      </div>

      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      
      <div>
        <h3>Reservations:</h3>
        <div>
          <div>{reservationsJSX()}</div>
          <div className="text-center">
            {reservations.length === 0 && (
              <h5 className="text-center row flex-column bg-light border rounded-lg mx-1 my-3 px-2 py-2">There are no reservations for today</h5>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3>Tables:</h3>
        <div>{tablesJSX()}</div>
      </div>
      
    </main>
  );
}

export default Dashboard;
