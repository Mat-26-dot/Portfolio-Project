"use client";
import { createContext, useState } from "react";

export const RecipeContext = createContext();

export function RecipeProvider({ children }) {
    const [submittedRecipe, setSubmittedRecipe] = useState(null);

    return (
        <RecipeContext.Provider value={{ submittedRecipe, setSubmittedRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
}