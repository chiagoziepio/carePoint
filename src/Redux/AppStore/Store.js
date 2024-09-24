import { configureStore } from "@reduxjs/toolkit";
import { AppApi } from "../Api/AppApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import PatientReducer from "../features/PatientSlice/PatientSlice";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist/es/constants";


const Store = configureStore({
    reducer:{
        PatientReducer: PatientReducer,
        [AppApi.reducerPath] : AppApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(AppApi.middleware)
})


export const persistor = persistStore(Store);

export default Store