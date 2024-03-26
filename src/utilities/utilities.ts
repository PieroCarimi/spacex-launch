export const utilitySetIsLogged = (isLogged: boolean) => {
    if (typeof window !== 'undefined') {
        if (isLogged) {
            localStorage.setItem("isLogged", JSON.stringify(true));
        } else {
            localStorage.removeItem("isLogged");
        }
    }
}

export const utilityGetIsLogged = () => {
    if (typeof window !== 'undefined') {
        try {
            const isLoggedString = localStorage.getItem("isLogged");
            return isLoggedString ? JSON.parse(isLoggedString) : false;
        } catch(error: any) {
            utilitySetIsLogged(false);
            return false;
        }
    }
    return false; // Ritorna false se `window` non è definito
}

export const utilitySetLoading = (loading: boolean) => {
    if (typeof window !== 'undefined') {
        if (loading) {
            localStorage.setItem("loading", JSON.stringify(true));
        } else {
            localStorage.removeItem("loading");
        }
    }
}

export const utilityGetLoading = () => {
    if (typeof window !== 'undefined') {
        try {
            const loadingString = localStorage.getItem("loading");
            return loadingString ? JSON.parse(loadingString) : false;
        } catch (error: any) {
            utilitySetLoading(false);
            return false;
        }
    }
}