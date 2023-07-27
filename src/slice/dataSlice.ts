import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import rawData from '../assets/big_data.json';

export interface Data{
    number: number,
    mod350: number,
    mod8000: number,
    mod20002: number
}

export interface Filter{
    name: string,
    filterValues: number[]
}

interface DataState{
    data: Data[],
    filters: Filter[],
    number: number[],
    mod350: number[],
    mod8000: number[],
    mod20002: number[]
}

const initialState: DataState = {
    data: (<Data[]>rawData),
    filters: [],
    number: (<Data[]>rawData).map((val:Data) => val.number),
    mod350: (<Data[]>rawData).map((val:Data) => val.mod350),
    mod8000: (<Data[]>rawData).map((val:Data) => val.mod8000),
    mod20002: (<Data[]>rawData).map((val:Data) => val.mod20002),
}

export const DataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addFilters: (state, action: PayloadAction<Filter>) => {
            if (state.filters.filter(item => item.name === action.payload.name).length === 0) {
                state.filters.push(action.payload);
            } else {
                state.filters = state.filters.map(item => {
                    if (item.name === action.payload.name) {
                        return action.payload
                    } else {
                        return item;
                    }
                })
            }
        },
        removeFilter: (state, action: PayloadAction<Filter>) => {
            state.filters = state.filters.filter(item => item.name !== action.payload.name);
        },
        setNumber: (state, action: PayloadAction<number[]>) => {
            state.number = action.payload
        },
        setMod350: (state, action: PayloadAction<number[]>) => {
            state.mod350 = action.payload
        },
        setMod8000: (state, action: PayloadAction<number[]>) => {
            state.mod8000 = action.payload
        },
        setMod20002: (state, action: PayloadAction<number[]>) => {
            state.mod20002 = action.payload
        },
    }
});

export default DataSlice.reducer;

export const {  addFilters, removeFilter,setNumber, setMod350, setMod8000, setMod20002 } = DataSlice.actions;