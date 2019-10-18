import { createStore } from "redux";
import rootReducer from "JS/Reducers/Index";

const store = createStore(rootReducer);

export default store;