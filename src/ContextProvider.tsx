import { ReactNode, createContext, useState } from "react";
import { Launch, TContext } from "./declarations";
import axios from "axios";

export const AppContext = createContext<TContext>({
    launches: [],
    isLogged: false,
    getLaunches: () => {},
    getLaunchById: () => {},
    updateLaunch: () => {},
    loading: false,
    error: "",
})

interface Props {
    children: ReactNode;
    initialLaunches: Launch[];
}

export function ContextProvider({children, initialLaunches}: Props){
    const [ launches, setLaunches ] = useState<TContext["launches"]>(initialLaunches);
    const [ isLogged, setIsLogged ] = useState<TContext["isLogged"]>(false);
    const [ loading, setLoading ] = useState<TContext["loading"]>(false);
    const [ error, setError ] = useState<TContext["error"]>("");

    const getLaunches = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/launches");
            setLaunches(response.data);
            setLoading(false);
        } catch(error: any) {
            setError(error.message);
            setLoading(false);
        }
    }

    const getLaunchById = async (launchId: Launch["id"]) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/launches/${launchId}`);
            setLoading(false);
            return response.data;
        } catch(error: any) {
            setError(error.message);
            setLoading(false);
        }
    }

    const updateLaunch = async (launchId: Launch["id"], updatedLaunch: Launch) => {
        if(error)
        try {
            setLoading(true);
            const response = await axios.put(`/api/launches/${launchId}`, updatedLaunch);
            setLoading(false);
            setLaunches(prevLaunches => {
                if (!prevLaunches) return null;
                return prevLaunches.map(launch => {
                    if (launch.id === launchId) {
                        return updatedLaunch; // Aggiorna il lancio corrispondente
                    } else {
                        return launch; // Mantieni invariati gli altri lanci
                    }
                });
            });
        } catch(error: any) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <AppContext.Provider
            value={{
                launches,
                isLogged,
                getLaunches,
                getLaunchById,
                updateLaunch,
                loading,
                error
            }}
        >
            {children}
        </AppContext.Provider>
    )
}