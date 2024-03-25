export interface Launch {
    id: number;
    name: string;
    flight_number: number;
    data_local: Date;
    success: boolean;
    image_small: string;
    image_large: string;
    webcast_code: string;
    details: string;
    article: string;
}

export interface TContext {
    launches:  Array<Launch> | null;
    isLogged: boolean;
    getLaunches: () => void;
    getLaunchById: (launchId: Launch["id"]) => void;
    updateLaunch: (launchId: Launch["id"], updatedLaunch: Launch) => void;
    createLaunch: (newLaunch: Launch) => void;
    deleteLaunch: (launchId: Launch["id"]) => void;
    loading: boolean;
    error: string;
}
