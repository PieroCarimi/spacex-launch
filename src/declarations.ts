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
    loading: boolean;
    error: string;
}
