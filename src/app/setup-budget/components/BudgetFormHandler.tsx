import InputBudgetComponent from "@/app/components/InputBudgetComponent";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { setSourceValue } from "@/app/store/FinancesSlice";
import { categories } from "@/app/data/categories";
import PrevNextButtons from "./layout/PrevNextButtons";


interface SourceObject {
    label: string;
    recurring: boolean;
}

export default function BudgetFormHandler({ onPrev, onNext }: { onPrev: () => void, onNext: () => void }) {
    const dispatch = useDispatch<AppDispatch>()
    const financesState = useSelector((state: RootState) => state.finances);
    const budgetState = useSelector((state: RootState) => state.budgetState.budgetState);
    const keys = Object.keys(categories) as Array<keyof typeof categories>;

    const validCategories = keys.filter((key) => categories[key].hasRecurring);

    const categoryKey = validCategories[budgetState - 1];
    const category = categories[categoryKey];

    const handleChange = (source: string, value: string | number) => {
        dispatch(setSourceValue({ category: categoryKey, source, value}))
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-headerGray mb-2">{category["label"]}</h1>
            <p className="text-sm text-textGray mb-4">{category["description"]}</p>
            {Object.entries(category.sources).map(([sourceKey, source]: [string, SourceObject]) => {
                if (source.recurring) {
                    return (
                        <div key={sourceKey} className="mb-4">
                            <InputBudgetComponent
                                label={source.label}
                                value={
                                    financesState[categoryKey]?.[sourceKey] !== undefined &&
                                    financesState[categoryKey]?.[sourceKey] !== 0
                                        ? String(financesState[categoryKey][sourceKey])
                                        : ""
                                }
                                onChange={(e) => handleChange(sourceKey, e.target.value)}
                            />
                        </div>
                    );
                }
                return null;
            })}
            <PrevNextButtons onPrev={onPrev} onNext={onNext} />
        </div>
    )
}