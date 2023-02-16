import { combineReducers } from "redux";

import changeScreeen from "../component/ImageContainer/reducer";
import registerReducer  from "../screen/Login/signUpreducer";
const rootReducer=combineReducers({
    changeScreeen,
    registerReducer
})

export default rootReducer;