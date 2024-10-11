import { configureStore } from "@reduxjs/toolkit";
import { AppApi } from "../Api/AppApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import PatientReducer from "../features/Patients/PatientSlice";
import AdminReducer from "../features/Admin/AdminSlice";
import DoctorReducer from "../features/Doctor/DoctorSlice";
import AppReducer from "../Api/AppSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

const authPersistConfig = {
  key: "patientSlice",
  storage,
  whitelist: ["patient", "notification", "token"],
};
const authPersistDocConfig = {
  key: "doctorSlice",
  storage,
  whitelist: ["doctor", "notification", "token"],
};
const authPersistUserConfig = {
  key: "AppSlice",
  storage,
  whitelist: ["user"],
};
const authPersistAdminConfig = {
  key: "AdminSlice",
  storage,
  whitelist: ["doctors"],
};

const persistedPatientReducer = persistReducer(
  authPersistConfig,
  PatientReducer
);
const persistedAdminReducer = persistReducer(
  authPersistAdminConfig,
  AdminReducer
);
const persistedDocReducer = persistReducer(authPersistDocConfig, DoctorReducer);
const persistedUserReducer = persistReducer(authPersistUserConfig, AppReducer);

const Store = configureStore({
  reducer: {
    PatientReducer: persistedPatientReducer,
    AdminReducer: persistedAdminReducer,
    DoctorReducer: persistedDocReducer,
    AppReducer: persistedUserReducer,
    [AppApi.reducerPath]: AppApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(AppApi.middleware),
});

export const persistor = persistStore(Store);

export default Store;
