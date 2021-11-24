import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";

import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";

import { uiCloseModal } from "../../../actions/ui";
import {
  eventClearActiveEvent,
  eventStartAddNew,
} from "../../../actions/events";

import { fetchTokenDNI } from "../../../helpers/fetch";

const now = moment().minutes(0).seconds(0).add(1, "hours"); // 3:00:00
// const nowPlus1 = now.clone().add(1, "hours");

const initEvent = {
  dni: "",
  name: "",
  notes: "",
  start: now.toDate(),
  end: "",
};
const token = process.env.REACT_APP_TOKEN_DNI;

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());

  const [validDni, setValidDni] = useState(false);
  const [name, setName] = useState("");

  const [formValues, setFormValues] = useState(initEvent);

  const { notes, dni } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const validar = (e) => {
    e.preventDefault();

    if (dni.length < 8) {
      return Swal.fire("Error", "DNI debe tener 8 digitos", "error");
    } else {
      fetchTokenDNI(
        `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=${token}`,
        null
      )
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.success === false) {
            return Swal.fire("Error", "DNI INVALIDO", "error");
          } else {
            setValidDni(true);
            setName(
              `${
                result.nombres +
                " " +
                result.apellidoPaterno +
                " " +
                result.apellidoMaterno
              } `
            );
            const date = moment(dateStart).format();
            const agregado = moment(date).add(1, "hours").toDate();
            setFormValues({
              ...formValues,
              end: agregado,
              name: `${
                result.nombres +
                " " +
                result.apellidoPaterno +
                " " +
                result.apellidoMaterno
              } `,
            });
          }
        });
    }
  };

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    // TODO: cerrar el modal
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (validDni === false) {
      return Swal.fire("Error", "Dni no validado", "error");
    } else {
      return Swal.fire({
        title: "Va a reservar una cita, ¿Esta seguro(a)?",
        text: "La cita no se podra eliminar, ni editar",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Reservar cita",
        denyButtonText: `No reservar cita`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (activeEvent) {
            console.log("editar");
          } else {
            dispatch(eventStartAddNew(formValues));
            setFormValues({
              dni: "",
              name: "",
              notes: "",
              start: now.toDate(),
              end: "",
            });
            setName("");
            setValidDni(false);
            closeModal();
          }
          Swal.fire("Se ha guardado exitosamente", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Cita no reservada", "", "info");
        }
      });
    }
  };

  return (
    <div
      className={`${
        modalOpen ? "flex" : "hidden"
      } modal h-screen z-50 w-full fixed left-0 top-0 justify-center items-center bg-black bg-opacity-50`}
    >
      <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
        <div className="border-b px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold text-lg">
            {activeEvent ? "Editar evento" : "Nuevo evento"}
          </h3>
          <button
            onClick={() => {
              closeModal();
            }}
            className="text-black close-modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <hr />
        <form className="container" onSubmit={handleSubmitForm}>
          <div className="relative">
            <label className="ml-3 leading-7 text-sm text-gray-600">
              Fecha y hora inicio
            </label>
            <DateTimePicker
              onChange={handleStartDateChange}
              value={dateStart}
              className="w-full bg-gray-100 bg-opacity-50 focus:bg-white focus:ring-2 text-base py-1 px-3 leading-8 transition-colors"
            />
          </div>

          <hr />
          <div className="p-2 w-full">
            <label className="leading-7 text-sm text-gray-600">DNI</label>
            <input
              type="number"
              className="px-2 w-full bg-gray-100 bg-opacity-60 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 leading-8"
              placeholder="Escribe tu DNI"
              name="dni"
              autoComplete="off"
              value={dni}
              onChange={handleInputChange}
            />
            <button
              onClick={(e) => {
                validar(e);
              }}
              className="mt-3 rounded-md flex w-full py-2 font-normal text-lg leading-3 text-white bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2  duration-150  items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                class="feather feather-check-circle mx-4"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h1>Validar DNI</h1>
            </button>
            {validDni ? (
              <>
                <label className="ml-2 leading-7 text-xs text-gray-600">
                  Hola, {`${name}`}
                </label>
              </>
            ) : null}
          </div>

          <div className="p-2 w-full">
            <label className="ml-2 leading-7 text-sm text-gray-600">
              Observaciones
            </label>
            <textarea
              type="text"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-2 resize-none leading-6 transition-colors duration-200 ease-in-out"
              placeholder="Observaciones"
              rows="5"
              name="notes"
              value={notes}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="p-2 w-full">
            <button
              type="submit"
              className="w-full flex text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-save float-left mt-1"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                <span className="float-left ml-2 mt-1">
                  Haz click para guardar
                </span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
