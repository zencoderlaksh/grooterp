import { useDispatch, useSelector } from "react-redux";
import { fetchTodayPunch, punchIn, punchOut } from "../../store/punchSlice";
import { useEffect } from "react";

const Punch = () => {
  const dispatch = useDispatch();
  const { punchInTime, punchOutTime } = useSelector(
    (state) => state.punch
  );

  useEffect(() => {
    dispatch(fetchTodayPunch());
  }, [dispatch]);

  const hasPunchedIn = !!punchInTime;
const hasPunchedOut = !!punchOutTime;

 

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Punch In / Punch Out
      </h1>

      <div className="text-center mb-6">
        <p><b>Punch In:</b> {punchInTime ? new Date(punchInTime).toLocaleTimeString() : "--"}</p>
        <p><b>Punch Out:</b> {punchOutTime ? new Date(punchOutTime).toLocaleTimeString() : "--"}</p>
      </div>

      <button
  disabled={hasPunchedIn}
  onClick={() => dispatch(punchIn())}
  className={`px-6 py-2 rounded text-white ${
    hasPunchedIn ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
  }`}
>
  Punch In
</button>

<button
  disabled={!hasPunchedIn || hasPunchedOut}
  onClick={() => dispatch(punchOut())}
  className={`px-6 py-2 rounded text-white ${
    !hasPunchedIn || hasPunchedOut
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-600"
  }`}
>
  Punch Out
</button>

    </div>
  );
};

export default Punch;
