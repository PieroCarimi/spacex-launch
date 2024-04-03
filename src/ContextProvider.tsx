import { ReactNode, createContext, useState } from 'react';
import { Launch, TContext } from './declarations';
import axios from 'axios';

export const AppContext = createContext<TContext>({
	launches: [],
	isLogged: false,
	getLaunches: () => {},
	getLaunchById: () => {},
	updateLaunch: () => {},
	createLaunch: () => {},
	deleteLaunch: () => {},
	login: () =>{},
	loading: false,
	error: '',
});

interface Props {
	children: ReactNode;
	initialLaunches: Launch[] | null;
}

export function ContextProvider({ children, initialLaunches }: Props) {
	const [launches, setLaunches] =
		useState<TContext['launches']>(initialLaunches);
	const [isLogged, setIsLogged] = useState<TContext['isLogged']>(false);
	const [loading, setLoading] = useState<TContext['loading']>(false);
	const [error, setError] = useState<TContext['error']>('');

	const getLaunches = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/launches');
			setLaunches(response.data);
			setLoading(false);
		} catch (error: any) {
			setError(error.message);
			setLoading(false);
		}
	};

	const getLaunchById = async (launchId: Launch['idLaunches']) => {
		try {
			setLoading(true);
			const response = await axios.get(`/api/launches?id=${launchId}`);
			setLoading(false);
			return response.data;
		} catch (error: any) {
			setError(error.message);
			setLoading(false);
		}
	};

	const updateLaunch = async (
		launchId: Launch['idLaunches'],
		updatedLaunch: Launch,
	) => {
			try {
				setLoading(true);
				const response = await axios.put(
					`/api/launches?id=${launchId}`,
					updatedLaunch,
				);
				setLoading(false);
				setLaunches((prevLaunches) => {
					if (!prevLaunches) return [updatedLaunch]; // Inizializza come un array con updatedLaunch se prevLaunches è null
					return prevLaunches.map((launch) => {
					  if (launch.idLaunches === launchId) {
						return updatedLaunch; // Aggiorna il lancio corrispondente
					  } else {
						return launch; // Mantieni invariati gli altri lanci
					  }
					});
				  });				  
			} catch (error: any) {
				setError(error.message);
				setLoading(false);
			}
	};

	const createLaunch = async (newLaunch: Launch) => {
		try {
			setLoading(true);
			await axios.post('/api/launches', newLaunch);
			setLoading(false);
			if (launches === null) {
				setLaunches([newLaunch]);
			} else {
				setLaunches([...launches, newLaunch]);
			}
		} catch (error: any) {
			setError(error.message);
			setLoading(false);
		}
	};

	const deleteLaunch = async (launchId: number) => {
		try {
			setLoading(true);
			await axios.delete(`/api/launches?id=${launchId}`);
			setLaunches((prevLaunches: Array<Launch> | null) => {
				if (prevLaunches !== null) {
					return prevLaunches.filter(
						(launch: Launch) => launch.idLaunches !== launchId,
					);
				} else {
					return null;
				}
			});
			setLoading(false);
		} catch (error: any) {
			setError(error.message);
			setLoading(false);
		}
	};

	const login = () => {
		setIsLogged(!isLogged);
	}

	return (
		<AppContext.Provider
			value={{
				launches,
				isLogged,
				getLaunches,
				getLaunchById,
				updateLaunch,
				createLaunch,
				deleteLaunch,
				loading,
				error,
				login
			}}
		>
			{children}
		</AppContext.Provider>
	);
}