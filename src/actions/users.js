import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";

export const userStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("users");
      const body = await resp.json();

      const users = body.usuarios;
      dispatch(userLoaded(users));
    } catch (error) {
      console.log(error);
    }
  };
};

const userLoaded = (users) => ({
  type: types.userLoaded,
  payload: users,
});
