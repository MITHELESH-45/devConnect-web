import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionSlice";

const appStore = configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
        connections:connectionsReducer,
    }
})

export default appStore;