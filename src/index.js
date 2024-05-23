import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./Fonts/Font.css"

import persistedReducer from "./modules";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

import { CookiesProvider } from "react-cookie";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </PersistGate>
  </Provider>
);
