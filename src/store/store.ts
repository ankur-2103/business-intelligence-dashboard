import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import dataSlice from "../slice/dataSlice";

// This file creates a redux store

// Create redux store
export const store = configureStore({
    reducer: {
        data: dataSlice
    }
})

// export disptach
export const useAppDispatch: () => typeof store.dispatch = useDispatch;

// export selector
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;