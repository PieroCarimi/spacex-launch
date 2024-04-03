export interface Launch {
	idLaunches: number;
	name: string;
	flight_number: string;
	data_local: string;
	success: string;
	image_small: string;
	image_large: string;
	webcast_code: string;
	details: string;
	article: string;
}

export interface TContext {
	launches: Array<Launch> | null;
	isLogged: boolean;
	getLaunches: () => void;
	getLaunchById: (launchId: Launch['idLaunches']) => any;
	updateLaunch: (
		launchId: Launch['idLaunches'],
		updatedLaunch: Launch,
	) => void;
	createLaunch: (newLaunch: Launch) => void;
	deleteLaunch: (launchId: Launch['idLaunches']) => void;
	login: () => void;
	loading: boolean;
	error: string;
}