import { combineReducers } from "redux";

import data from "./product.reducer";

const appReducer = combineReducers({
  data,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
