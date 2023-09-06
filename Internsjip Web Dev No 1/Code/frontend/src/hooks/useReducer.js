export const initialState = false;

export const Reducer = (state, action) => {
  if (action.type !== "authenticated") return false;
  else return true;
};
