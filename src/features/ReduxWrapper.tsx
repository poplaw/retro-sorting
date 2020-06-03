import React, { FC } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from ".";

const store = configureStore({ reducer: rootReducer });

const ReduxWrapper: React.ElementType = ({ element }) => (
    <Provider store={store}>{element}</Provider>
);

export default ReduxWrapper;
