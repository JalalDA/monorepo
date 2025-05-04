import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { rootReducer } from "./reducers";



export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([
        ]),
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers(),
});

export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);