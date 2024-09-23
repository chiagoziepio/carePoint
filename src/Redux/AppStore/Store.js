import { configureStore } from "@reduxjs/toolkit";
import { AppApi } from "../Api/AppApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
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