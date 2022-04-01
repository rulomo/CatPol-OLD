import React, { useContext, createContext } from "react";

//Context
export const SearchContext = createContext();

//Provider
export const SearchContextProvider = ({ children }) => {
    const [valueSearch, setValueSearch] = React.useState();

    const values = React.useMemo(
        () => ({
            valueSearch, // States que seran visibles en el contexto.
            setValueSearch,    
        }),
        [valueSearch]
    ); // States que serán visibles en el contexto.

    // Interface donde será expuesto como proveedor y envolverá la App.
    return (
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    );
};

//
export function useSearchContext() {
    const context = useContext(SearchContext);

    if (!context) {
        console.error("Error deploying App Context!!!");
    }

    return context;
}

export default useSearchContext;
