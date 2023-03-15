// "use client";

import { createContext, useState } from "react";

export const InventoryContext = createContext(null)

export function InventoryProvider({children}) {
    // console.log("InventoryProvider")
    const [unitsArray, s__unitsArray] = useState([])

    return (
        <InventoryContext.Provider
            value={{unitsArray, s__unitsArray}}
        >
            {children}
        </InventoryContext.Provider>

    )
}