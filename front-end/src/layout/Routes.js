import React, { useState, useEffect} from "react";

import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import useQuery from '../utils/useQuery';
import { listReservations, listTables } from "../utils/api";
import NewTable from '../tables/NewTable';
import SeatReservation from "../reservations/SeatReservation";
import Search from '../search/Search';
import NewReservation from '../reservations/NewReservation';
import EditReservation from '../reservations/EditReservation';

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  const query = useQuery();
  const [date, setDate] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setDate("");
    if (query.get("date")) {
      setDate(query.get("date"));
    } else {
      if (location.pathname === "/dashboard")
      history.push(`/dashboard?date=${today()}`);
    }
  }, [query, location.pathname, history]);

  useEffect(loadDashboard, [date]);

  function loadDashboard () {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);

    return () => abortController.abort();
  }

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/dashboard">
        <Dashboard
          date={date}
          setDate={setDate}
          reservations={reservations}
          reservationsError={reservationsError}
          tables={tables}
          tablesError={tablesError}
          loadDashboard={loadDashboard}
        />
      </Route>

      <Route path="/reservations/new">
        <NewReservation loadDashboard={loadDashboard} />
      </Route>

      <Route path="/reservations/:reservation_id/edit">
        <EditReservation loadDashboard={loadDashboard} />
      </Route>

      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation tables={tables} setTables={setTables} loadDashboard={loadDashboard} />
      </Route>

      <Route path="/tables/new">
        <NewTable loadDashboard={loadDashboard} />
      </Route>

      <Route path="/search">
        <Search date={date} />
      </Route>

      <Route>
        <NotFound />
      </Route>
      
    </Switch>
  );
}

export default Routes;
