import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();

  const handleClickNew = () => {
    dispatch(uiOpenModal());
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-30 flex-row space-x-4">
        <button
          className="rounded-md flex space-x-2 w-60 h-16 font-normal text-sm leading-3 text-white bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2  duration-150 justify-center items-center"
          onClick={handleClickNew}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h1 className="text-lg">Reservar una cita</h1>
        </button>
      </div>
    </>
  );
};
