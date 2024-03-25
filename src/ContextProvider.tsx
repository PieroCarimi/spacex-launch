import { ReactNode, createContext, useState } from "react";
import { TContext } from "./declarations";

export const AppContext = createContext<TContext>({
    launches: [],
    isLogged: false,
    loading: false,
    error: "",
})

interface Props {
    children: ReactNode;
}

export function ContextProvider({children}: Props){
    const [ launches, setLaunches ] = useState<TContext["launches"]>([]);
    const [ isLogged, setIsLogged ] = useState<TContext["isLogged"]>(false);
    const [ loading, setLoading ] = useState<TContext["loading"]>(false);
    const [ error, setError ] = useState<TContext["error"]>("");

    return (
        <AppContext.Provider
            value={{
                launches,
                isLogged,
                loading,
                error
            }}
        >
            {children}
        </AppContext.Provider>
    )
}