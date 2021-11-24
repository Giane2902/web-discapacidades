import { useEffect } from "react";
import Home from "../../components/Admin/Home";
import { useDispatch, useSelector } from "react-redux";

import { eventStartLoading } from "../../actions/events";

function Index() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  return (
    <>
      <Home events={events} />
    </>
  );
}

export default Index;
