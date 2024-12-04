"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categories } from "../data/categories";

type CategoryKey = keyof typeof categories;

type SourceKey<C extends CategoryKey> = keyof typeof categories[C]["sources"];

interface SourceState {
    [key: string]: number | string;
}

export interface CategoriesState {
    [category: string]: SourceState;
}

const initialState: CategoriesState = Object.keys(categories).reduce((acc, key) => {
    const categoryKey = key as CategoryKey;
    acc[categoryKey] = {};
    Object.keys(categories[categoryKey].sources).forEach((source) => {
        acc[key][source] = 0;
    });
    return acc;
}, {} as CategoriesState);

initialState.custom = {};

export interface FinancesState extends CategoriesState {};

const financesSlice = createSlice({
    name: "finances",
    initialState,
    reducers: {
        setSourceValue: <C extends CategoryKey>(
            state: FinancesState, 
            action: PayloadAction<{ category: C; source: string; value: number | string }>) => {
            const { category, source, value } = action.payload;
            if (state[category]) {
                state[category][source as string] = value;
            }
        },
        addCustomSource: (state, action: PayloadAction<{ label: string }>) => {
            const sourceKey = action.payload.label.toLowerCase().replace(/\s+/g, "_");
            state.custom[sourceKey] = 0;
        },
        removeCustomSource: (state, action: PayloadAction<{ source: string }>) => {
            delete state.custom[action.payload.source];
        },
        setFinances: (state, action: PayloadAction<CategoriesState>) => {
            return action.payload;
        },
    },
});

export const { setSourceValue, addCustomSource, removeCustomSource, setFinances } = financesSlice.actions;

export default financesSlice.reducer;