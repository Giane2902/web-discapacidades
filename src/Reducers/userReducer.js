import { types } from "../types/types";

const initialState = {
  users: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.userAddNew:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case types.userUpdated:
      return {
        ...state,
        users: state.users.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case types.userDeleted:
      return {
        ...state,
        users: state.users.filter((e) => e.id !== state.users.id),
      };

    case types.userLoaded:
      return {
        ...state,
        users: [...action.payload],
      };

    case types.userLogout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
