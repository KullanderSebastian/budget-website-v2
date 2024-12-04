import { AppDispatch, RootState } from "./store";
import { setFinances } from "./FinancesSlice";

export const saveBudget = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const { finances } = state;

    try {
        const response = await fetch("/api/finances/save-budget", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ finances }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Failed to save budget");
        }

        console.log("Budget saved successfully");
    } catch (error) {
        console.error("Error saving budget: ", error);
    }
};

export const fetchBudget = () => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch("/api/finances/get-budget", {
            method: "GET",
        });

        const data = await response.json();

        console.log("Fetched Data:", data);


        if (response.ok) {
            dispatch(setFinances(data.finances));
        } else {
            throw new Error(data.message || "Failed to fetch budget");
        }
    } catch (error) {
        console.error("Error fetching budget: ", error);
    }
};