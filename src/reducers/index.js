import { combineReducers } from "redux";
import { loginReducer } from "../reducers/loginReducer";
import { userReducer } from "../reducers/userReducer";
import { agreementReducer } from "./agreementReducer";
import { searchBarReducer } from "./searchBarReducer";

export default combineReducers({
    loginReducer,
    userReducer,
    agreementReducer,
    searchBarReducer
});