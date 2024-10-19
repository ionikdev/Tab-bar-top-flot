import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Use AsyncStorage for storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});



export const persistor = persistStore(store); // Create a persistor
export type AppDispatch = typeof store.dispatch;

export default store;
